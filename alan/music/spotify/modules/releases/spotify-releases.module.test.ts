import { afterAll, afterEach, beforeEach, expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import type { Fetching } from "akasha/alan/music/spotify/modules/fetching/spotify-fetching.module.code.ts"
import {
  albumMinutes,
  albumSchema,
  albumWithTracksSchema,
  artistAlbumsPath,
  getAlbum,
  getArtistAlbums,
} from "akasha/alan/music/spotify/modules/releases/spotify-releases.module.code.ts"
import { writeToken } from "akasha/alan/music/spotify/modules/token-store/spotify-token-store.module.code.ts"

const ROOT = mkdtempSync("/var/tmp/spotify-releases-")

const ALBUM = {
  id: "an-album-id",
  name: "An Album",
  album_type: "album",
  release_date: "2026-02-27",
  release_date_precision: "day",
  total_tracks: 2,
  external_urls: { spotify: "https://open.spotify.com/album/an-album-id" },
}

let calls: string[] = []

let next = 0

afterAll(() => {
  rmSync(ROOT, { recursive: true, force: true })
})

function answeringWith(bodies: readonly unknown[]): Fetching {
  let at = 0
  return async (url) => {
    calls.push(url)
    const body = bodies[Math.min(at, bodies.length - 1)]
    at += 1
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }
}

function pageOf(items: readonly unknown[], nextPath: string | null): unknown {
  return { items, total: items.length, limit: 10, offset: 0, next: nextPath, previous: null }
}

beforeEach(() => {
  calls = []
  next += 1
  process.env.SPOTIFY_TOKEN_FILE = join(ROOT, `at-${next}`, "token.json")
  process.env.SPOTIFY_RATE_LIMIT_MS = "1"
  writeToken({
    accessToken: "an-access-token",
    refreshToken: "a-refresh-token",
    expiresAt: "2999-01-01T00:00:00.000Z",
    scopes: [],
  })
})

afterEach(() => {
  delete process.env.SPOTIFY_TOKEN_FILE
  delete process.env.SPOTIFY_RATE_LIMIT_MS
})

test("a page asks for ten albums, which is the most Spotify answers this read with", () => {
  expect(artistAlbumsPath("an-artist-id")).toContain("limit=10")
})

test("an album an artist only appears on is left out of what is asked for", () => {
  const asked = artistAlbumsPath("an-artist-id")
  expect(asked).toContain("include_groups=album%2Csingle%2Ccompilation")
  expect(asked).not.toContain("appears_on")
})

test("every album an artist put out is read, however many pages that takes", async () => {
  const albums = await getArtistAlbums(
    "an-artist-id",
    answeringWith([
      pageOf([ALBUM], "https://api.spotify.com/v1/artists/an-artist-id/albums?offset=10&limit=10"),
      pageOf([{ ...ALBUM, id: "a-second-album-id" }], null),
    ])
  )
  expect(albums.map((one) => one.id)).toEqual(["an-album-id", "a-second-album-id"])
  expect(calls).toHaveLength(2)
})

test("one album is read by its own id, because the bulk read is forbidden this app", async () => {
  await getAlbum("an-album-id", answeringWith([{ ...ALBUM, tracks: { items: [] } }]))
  expect(calls[0]).toBe("https://api.spotify.com/v1/albums/an-album-id")
})

test("an album's length is added up from the tracks that album holds", () => {
  const album = albumWithTracksSchema.parse({
    ...ALBUM,
    tracks: {
      items: [
        {
          id: "a",
          name: "A",
          duration_ms: 90_000,
          track_number: 1,
          disc_number: 1,
          explicit: false,
          artists: [{ id: "sp-a", name: "An Artist" }],
          external_urls: { spotify: "https://open.spotify.com/track/a" },
        },
        {
          id: "b",
          name: "B",
          duration_ms: 30_000,
          track_number: 2,
          disc_number: 1,
          explicit: true,
          artists: [{ id: "sp-a", name: "An Artist" }],
          external_urls: { spotify: "https://open.spotify.com/track/b" },
        },
      ],
    },
  })
  expect(albumMinutes(album)).toBe(2)
})

test("a day an album states only a year for is carried as Spotify states it", () => {
  const parsed = albumSchema.parse({
    ...ALBUM,
    release_date: "2026",
    release_date_precision: "year",
  })
  expect(parsed.release_date).toBe("2026")
  expect(parsed.release_date_precision).toBe("year")
})

test("a field Spotify adds later is carried through unread", () => {
  const parsed = albumSchema.parse({ ...ALBUM, popularity: 50 }) as { popularity?: number }
  expect(parsed.popularity).toBe(50)
})

test("an album stating no release date is refused rather than read as none", () => {
  const { release_date: releaseDate, ...without } = ALBUM
  expect(() => albumSchema.parse(without)).toThrow()
})
