import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { z } from "zod"
import { paginateOffset } from "./client"
import albumsDescriptor, {
  albumSchema,
  albumTracksPageSchema,
  severalAlbumsSchema,
  simplifiedTrackSchema,
} from "./endpoints/albums"

const externalUrls = { spotify: "https://open.spotify.com/album/x" }

function artistRef(id: string, name: string): Record<string, unknown> {
  return { id, name, uri: `spotify:artist:${id}`, external_urls: externalUrls }
}

function track(id: string, name: string, trackNumber: number): Record<string, unknown> {
  return {
    id,
    name,
    track_number: trackNumber,
    duration_ms: 200_000,
    uri: `spotify:track:${id}`,
    explicit: false,
    artists: [artistRef("ar1", "The Beatles")],
    external_urls: externalUrls,
  }
}

function album(id: string, name: string): Record<string, unknown> {
  return {
    id,
    name,
    album_type: "album",
    total_tracks: 2,
    release_date: "1969-09-26",
    uri: `spotify:album:${id}`,
    href: `https://api.spotify.com/v1/albums/${id}`,
    label: "Apple Records",
    artists: [artistRef("ar1", "The Beatles")],
    external_urls: externalUrls,
    extra_unknown_key: "tolerated",
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
  tokenDir = mkdtempSync(join(tmpdir(), "spotify-albums-test-"))
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
  const found = albumsDescriptor.probes.find((p) => p.name === name)
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
  test("declares the albums family with three probes and no required scopes", () => {
    expect(albumsDescriptor.name).toBe("albums")
    expect(albumsDescriptor.scopes).toEqual([])
    expect(albumsDescriptor.probes.map((p) => p.name)).toEqual([
      "GET /albums/{id}",
      "GET /albums (several)",
      "GET /albums/{id}/tracks",
    ])
  })
})

describe("shape parsing", () => {
  test("GET /albums/{id} parses a full album and tolerates unknown keys", async () => {
    handler = () =>
      json({ ...album("al1", "Abbey Road"), tracks: offsetPage([track("t1", "x", 1)], null) })
    const result = albumSchema.parse(await probe("GET /albums/{id}")())
    expect(result.id).toBe("al1")
    expect(result.artists[0]?.name).toBe("The Beatles")
    expect(Object.keys(result)).toContain("extra_unknown_key")
    expect(result.tracks?.items).toHaveLength(1)
  })

  test("GET /albums (several) records availability and preserves unresolved nulls", async () => {
    handler = () => json({ albums: [album("al1", "Abbey Road"), null] })
    const outcome = z
      .object({ available: z.literal(true), data: severalAlbumsSchema })
      .parse(await probe("GET /albums (several)")())
    expect(outcome.data.albums).toHaveLength(2)
    expect(outcome.data.albums[0]?.id).toBe("al1")
    expect(outcome.data.albums[1]).toBeNull()
  })

  test("GET /albums (several) records a 403 restriction without throwing", async () => {
    handler = () => new Response(null, { status: 403, statusText: "Forbidden" })
    expect(await probe("GET /albums (several)")()).toEqual({ available: false, status: 403 })
  })

  test("GET /albums/{id}/tracks parses an offset page of simplified tracks", async () => {
    handler = () => json(offsetPage([track("t1", "Come Together", 1)], null))
    const page = albumTracksPageSchema.parse(await probe("GET /albums/{id}/tracks")())
    expect(page.items).toHaveLength(1)
    expect(page.next).toBeNull()
  })
})

describe("pagination", () => {
  test("paginateOffset follows next across pages and flattens tracks", async () => {
    handler = (url) =>
      url.includes("offset=1")
        ? json(offsetPage([track("t2", "Something", 2)], null))
        : json(
            offsetPage(
              [track("t1", "Come Together", 1)],
              "https://api.spotify.com/v1/albums/x/tracks?offset=1&limit=1"
            )
          )
    const all = await paginateOffset("/albums/x/tracks?limit=1", simplifiedTrackSchema)
    expect(all.map((t) => t.id)).toEqual(["t1", "t2"])
  })
})

describe("error handling", () => {
  test("a 404 from the album endpoint rejects", async () => {
    handler = () => new Response("not found", { status: 404, statusText: "Not Found" })
    await expect(probe("GET /albums/{id}")()).rejects.toThrow(/spotify API 404/)
  })

  test("a malformed body fails the boundary parse", async () => {
    handler = () => json({ id: 123 })
    await expect(probe("GET /albums/{id}")()).rejects.toThrow()
  })
})
