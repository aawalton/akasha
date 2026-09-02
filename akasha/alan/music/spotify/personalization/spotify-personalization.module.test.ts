import { afterAll, afterEach, beforeEach, expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import { fetchingIs, fetchingIsOverHttp } from "../fetching/spotify-fetching.module.code.ts"
import { writeToken } from "../token-store/spotify-token-store.module.code.ts"
import { getTopArtists, TIME_RANGES, topItemsPath } from "./spotify-personalization.module.code.ts"

const ROOT = mkdtempSync("/var/tmp/spotify-top-")

let asked: string[] = []

let next = 0

afterAll(() => {
  rmSync(ROOT, { recursive: true, force: true })
})

beforeEach(() => {
  asked = []
  next += 1
  process.env.SPOTIFY_TOKEN_FILE = join(ROOT, `at-${next}`, "token.json")
  process.env.SPOTIFY_RATE_LIMIT_MS = "1"
  writeToken({
    accessToken: "an-access-token",
    refreshToken: "a-refresh-token",
    expiresAt: "2999-01-01T00:00:00.000Z",
    scopes: ["user-top-read"],
  })
})

afterEach(() => {
  fetchingIsOverHttp()
  delete process.env.SPOTIFY_TOKEN_FILE
  delete process.env.SPOTIFY_RATE_LIMIT_MS
})

test("three windows are asked for and no others", () => {
  expect(TIME_RANGES).toEqual(["short_term", "medium_term", "long_term"])
})

test("a window is named in the path beside the fifty item limit", () => {
  expect(topItemsPath("artists", "long_term")).toBe("/me/top/artists?time_range=long_term&limit=50")
})

test("a read takes one page even where Spotify names another", async () => {
  fetchingIs(async (url) => {
    asked.push(url)
    return new Response(
      JSON.stringify({
        items: Array.from({ length: 50 }, (_one, at) => ({ id: `id-${at}`, name: `Name ${at}` })),
        total: 100,
        limit: 50,
        offset: 0,
        next: "https://api.spotify.com/v1/me/top/artists?offset=50",
        previous: null,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  })
  const found = await getTopArtists("short_term")
  expect(found.length).toBe(50)
  expect(asked.length).toBe(1)
})
