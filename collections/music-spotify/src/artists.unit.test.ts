import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { z } from "zod"
import { paginateOffset } from "./client"
import artistsDescriptor, {
  artistAlbumsPageSchema,
  artistSchema,
  relatedArtistsSchema,
  severalArtistsSchema,
  simplifiedAlbumSchema,
  topTracksSchema,
} from "./endpoints/artists"

const externalUrls = { spotify: "https://open.spotify.com/artist/x" }

function artist(id: string, name: string): Record<string, unknown> {
  return {
    id,
    name,
    type: "artist",
    uri: `spotify:artist:${id}`,
    href: `https://api.spotify.com/v1/artists/${id}`,
    genres: ["rock"],
    popularity: 80,
    external_urls: externalUrls,
    extra_unknown_key: "tolerated",
  }
}

function simplifiedAlbum(id: string, name: string): Record<string, unknown> {
  return {
    id,
    name,
    album_type: "album",
    total_tracks: 12,
    release_date: "1969-09-26",
    uri: `spotify:album:${id}`,
    external_urls: externalUrls,
  }
}

function offsetPage(items: readonly unknown[], next: string | null): Record<string, unknown> {
  return { items, total: items.length, limit: 1, offset: 0, next, previous: null }
}

type FetchHandler = (url: string) => Response
let handler: FetchHandler = () => new Response(null, { status: 500 })

function createFetchStub(
  impl: (
    input: Parameters<typeof fetch>[0],
    init?: Parameters<typeof fetch>[1]
  ) => Promise<Response>
): typeof fetch {
  return Object.assign(impl, { preconnect: () => {} })
}

const originalFetch = globalThis.fetch
let tokenDir: string

beforeAll(() => {
  tokenDir = mkdtempSync(join(tmpdir(), "spotify-artists-test-"))
  const tokenPath = join(tokenDir, "token.json")
  writeFileSync(
    tokenPath,
    JSON.stringify({
      accessToken: "test-access-token",
      refreshToken: "test-refresh-token",
      expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
      scopes: [],
    })
  )
  process.env.SPOTIFY_TOKEN_FILE = tokenPath
  globalThis.fetch = createFetchStub((input) => Promise.resolve(handler(String(input))))
})

afterEach(() => {
  handler = () => new Response(null, { status: 500 })
})

afterAll(() => {
  globalThis.fetch = originalFetch
  process.env.SPOTIFY_TOKEN_FILE = undefined
  rmSync(tokenDir, { recursive: true, force: true })
})

function probe(name: string): () => Promise<unknown> {
  const found = artistsDescriptor.probes.find((p) => p.name === name)
  if (found == null) throw new Error(`no probe named ${name}`)
  return found.run
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}

describe("descriptor", () => {
  test("declares the artists family with five probes and no required scopes", () => {
    expect(artistsDescriptor.name).toBe("artists")
    expect(artistsDescriptor.scopes).toEqual([])
    expect(artistsDescriptor.probes.map((p) => p.name)).toEqual([
      "GET /artists/{id}",
      "GET /artists (several)",
      "GET /artists/{id}/albums",
      "GET /artists/{id}/top-tracks",
      "GET /artists/{id}/related-artists (restricted)",
    ])
  })
})

describe("shape parsing", () => {
  test("GET /artists/{id} parses a full artist and tolerates unknown keys", async () => {
    handler = () => json(artist("a1", "The Beatles"))
    const result = artistSchema.parse(await probe("GET /artists/{id}")())
    expect(result.id).toBe("a1")
    expect(result.name).toBe("The Beatles")
    expect(Object.keys(result)).toContain("extra_unknown_key")
  })

  test("GET /artists (several) records availability and preserves unresolved nulls", async () => {
    handler = () => json({ artists: [artist("a1", "The Beatles"), null] })
    const outcome = z
      .object({ available: z.literal(true), data: severalArtistsSchema })
      .parse(await probe("GET /artists (several)")())
    expect(outcome.data.artists).toHaveLength(2)
    expect(outcome.data.artists[0]?.id).toBe("a1")
    expect(outcome.data.artists[1]).toBeNull()
  })

  test("GET /artists (several) records a 403 restriction without throwing", async () => {
    handler = () => new Response(null, { status: 403, statusText: "Forbidden" })
    expect(await probe("GET /artists (several)")()).toEqual({ available: false, status: 403 })
  })

  test("GET /artists/{id}/albums parses an offset page", async () => {
    handler = () => json(offsetPage([simplifiedAlbum("al1", "Abbey Road")], null))
    const page = artistAlbumsPageSchema.parse(await probe("GET /artists/{id}/albums")())
    expect(page.items).toHaveLength(1)
    expect(page.next).toBeNull()
  })

  test("GET /artists/{id}/top-tracks parses the tracks wrapper", async () => {
    handler = () =>
      json({
        tracks: [
          {
            id: "t1",
            name: "Come Together",
            duration_ms: 259_000,
            uri: "spotify:track:t1",
            explicit: false,
            external_urls: externalUrls,
          },
        ],
      })
    const outcome = z
      .object({ available: z.literal(true), data: topTracksSchema })
      .parse(await probe("GET /artists/{id}/top-tracks")())
    expect(outcome.data.tracks).toHaveLength(1)
  })

  test("GET /artists/{id}/top-tracks records a 403 restriction without throwing", async () => {
    handler = () => new Response(null, { status: 403, statusText: "Forbidden" })
    expect(await probe("GET /artists/{id}/top-tracks")()).toEqual({ available: false, status: 403 })
  })
})

describe("pagination", () => {
  test("paginateOffset follows next across pages and flattens items", async () => {
    handler = (url) =>
      url.includes("offset=1")
        ? json(offsetPage([simplifiedAlbum("al2", "Let It Be")], null))
        : json(
            offsetPage(
              [simplifiedAlbum("al1", "Abbey Road")],
              "https://api.spotify.com/v1/artists/x/albums?offset=1&limit=1"
            )
          )
    const all = await paginateOffset("/artists/x/albums?limit=1", simplifiedAlbumSchema)
    expect(all.map((a) => a.id)).toEqual(["al1", "al2"])
  })
})

describe("error handling", () => {
  test("a 500 from the catalog endpoint rejects", async () => {
    handler = () => new Response("upstream boom", { status: 500, statusText: "Server Error" })
    await expect(probe("GET /artists/{id}")()).rejects.toThrow(/spotify API 500/)
  })

  describe("related-artists restriction", () => {
    test("records a 403 restriction without throwing", async () => {
      handler = () => new Response(null, { status: 403, statusText: "Forbidden" })
      expect(await probe("GET /artists/{id}/related-artists (restricted)")()).toEqual({
        available: false,
        status: 403,
      })
    })

    test("records a 404 restriction without throwing", async () => {
      handler = () => new Response(null, { status: 404, statusText: "Not Found" })
      expect(await probe("GET /artists/{id}/related-artists (restricted)")()).toEqual({
        available: false,
        status: 404,
      })
    })

    test("returns the parsed body on a legacy 200 success", async () => {
      handler = () => json({ artists: [artist("a1", "The Beatles")] })
      const outcome = z
        .object({ available: z.literal(true), data: relatedArtistsSchema })
        .parse(await probe("GET /artists/{id}/related-artists (restricted)")())
      expect(outcome.data.artists).toHaveLength(1)
    })

    test("propagates a non-restriction error (500)", async () => {
      handler = () => new Response("boom", { status: 500, statusText: "Server Error" })
      await expect(probe("GET /artists/{id}/related-artists (restricted)")()).rejects.toThrow(
        /spotify API 500/
      )
    })
  })
})
