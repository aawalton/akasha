import { afterAll, afterEach, beforeEach, expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import { fetchingIs, fetchingIsOverHttp } from "../fetching/spotify-fetching.module.code.ts"
import { writeToken } from "../token-store/spotify-token-store.module.code.ts"
import {
  addToQueue,
  getPlaybackState,
  getRecentlyPlayed,
  pausePlayback,
  startResumePlayback,
  withQuery,
} from "./spotify-player.module.code.ts"

const ROOT = mkdtempSync("/var/tmp/spotify-player-")

let calls: { url: string; method: unknown; body: unknown }[] = []

let next = 0

afterAll(() => {
  rmSync(ROOT, { recursive: true, force: true })
})

function answeringWith(body: unknown): undefined {
  fetchingIs(async (url, init) => {
    calls.push({ url, method: init.method, body: init.body })
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
    scopes: ["user-read-playback-state"],
  })
})

afterEach(() => {
  fetchingIsOverHttp()
  delete process.env.SPOTIFY_TOKEN_FILE
  delete process.env.SPOTIFY_RATE_LIMIT_MS
})

test("a query with nothing in it leaves the path alone", () => {
  expect(withQuery("/me/player/pause", { device_id: undefined })).toBe("/me/player/pause")
})

test("a query names only what it was given", () => {
  expect(withQuery("/me/player/seek", { position_ms: 0, device_id: undefined })).toBe(
    "/me/player/seek?position_ms=0"
  )
})

test("a query says false as text rather than dropping it", () => {
  expect(withQuery("/me/player/shuffle", { state: false })).toBe("/me/player/shuffle?state=false")
})

test("nothing playing reads as null", async () => {
  answeringWith(null)
  expect(await getPlaybackState()).toBe(null)
})

test("recently played is asked for with its limit and read as a cursor page", async () => {
  answeringWith({ items: [], limit: 5, next: null, cursors: null })
  const page = await getRecentlyPlayed({ limit: 5 })
  expect(calls[0]?.url).toBe("https://api.spotify.com/v1/me/player/recently-played?limit=5")
  expect(page.items).toEqual([])
})

test("a pause is a PUT with no body", async () => {
  answeringWith(null)
  await pausePlayback()
  expect(calls[0]?.method).toBe("PUT")
  expect(calls[0]?.body).toBe(undefined)
})

test("a resume with nothing asked of it sends no body", async () => {
  answeringWith(null)
  await startResumePlayback()
  expect(calls[0]?.url).toBe("https://api.spotify.com/v1/me/player/play")
  expect(calls[0]?.body).toBe(undefined)
})

test("a resume naming a track sends the uris it was given", async () => {
  answeringWith(null)
  await startResumePlayback({ uris: ["spotify:track:one"], deviceId: "a-device" })
  expect(calls[0]?.url).toBe("https://api.spotify.com/v1/me/player/play?device_id=a-device")
  expect(calls[0]?.body).toBe(JSON.stringify({ uris: ["spotify:track:one"] }))
})

test("a queue add is a POST naming the uri", async () => {
  answeringWith(null)
  await addToQueue("spotify:track:one")
  expect(calls[0]?.method).toBe("POST")
  expect(calls[0]?.url).toBe("https://api.spotify.com/v1/me/player/queue?uri=spotify%3Atrack%3Aone")
})
