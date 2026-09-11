import { afterAll, afterEach, beforeEach, expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import {
  fetchingIs,
  fetchingIsOverHttp,
} from "akasha/alan/music/spotify/fetching/spotify-fetching.module.code.ts"
import { writeToken } from "akasha/alan/music/spotify/token-store/spotify-token-store.module.code.ts"
import {
  getTrack,
  trackSchema,
} from "akasha/alan/music/spotify/tracks/spotify-tracks.module.code.ts"

const ROOT = mkdtempSync("/var/tmp/spotify-tracks-")

const ANSWER = {
  id: "a-track-id",
  name: "A Track",
  duration_ms: 1000,
  explicit: false,
  external_urls: { spotify: "https://open.spotify.com/track/a-track-id" },
  artists: [{ name: "An Artist" }],
}

let calls: string[] = []

let next = 0

afterAll(() => {
  rmSync(ROOT, { recursive: true, force: true })
})

function answeringWith(body: unknown): undefined {
  fetchingIs(async (url) => {
    calls.push(url)
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  })
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
  fetchingIsOverHttp()
  delete process.env.SPOTIFY_TOKEN_FILE
  delete process.env.SPOTIFY_RATE_LIMIT_MS
})

test("one track is read by its Spotify id", async () => {
  answeringWith(ANSWER)
  const track = await getTrack("a-track-id")
  expect(calls[0]).toBe("https://api.spotify.com/v1/tracks/a-track-id")
  expect(track.name).toBe("A Track")
})

test("a track names its own artists", () => {
  expect(trackSchema.parse(ANSWER).artists).toEqual([{ name: "An Artist" }])
  const { artists, ...without } = ANSWER
  expect(() => trackSchema.parse(without)).toThrow()
})

test("a field Spotify adds later is carried through unread", () => {
  const parsed = trackSchema.parse({ ...ANSWER, popularity: 50 }) as { popularity?: number }
  expect(parsed.popularity).toBe(50)
})

test("an artist Spotify names more about is carried through unread", () => {
  const parsed = trackSchema.parse({
    ...ANSWER,
    artists: [{ name: "An Artist", id: "an-artist-id" }],
  })
  expect(parsed.artists[0]).toEqual({ name: "An Artist", id: "an-artist-id" })
})
