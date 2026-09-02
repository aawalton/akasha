import { afterAll, afterEach, beforeEach, expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import { fetchingIs, fetchingIsOverHttp } from "../fetching/spotify-fetching.module.code.ts"
import { writeToken } from "../token-store/spotify-token-store.module.code.ts"
import { buildSearchPath, searchPaginate } from "./spotify-search.module.code.ts"

const ROOT = mkdtempSync("/var/tmp/spotify-search-")

let asked: string[] = []

let next = 0

afterAll(() => {
  rmSync(ROOT, { recursive: true, force: true })
})

function pageOf(items: readonly unknown[], following: string | null): unknown {
  return {
    items,
    total: items.length,
    limit: items.length,
    offset: 0,
    next: following,
    previous: null,
  }
}

function answering(...bodies: readonly unknown[]): undefined {
  let at = 0
  fetchingIs(async (url) => {
    asked.push(url)
    const body = bodies[Math.min(at, bodies.length - 1)]
    at += 1
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  })
}

beforeEach(() => {
  asked = []
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

test("several kinds are asked for in one search", () => {
  expect(buildSearchPath({ q: "one more time", types: ["track", "artist"] })).toBe(
    "/search?q=one+more+time&type=track%2Cartist"
  )
})

test("a limit and an offset are named only where they were given", () => {
  expect(buildSearchPath({ q: "a", types: ["track"], limit: 5 })).toBe(
    "/search?q=a&type=track&limit=5"
  )
  expect(buildSearchPath({ q: "a", types: ["track"], offset: 10, market: "US" })).toBe(
    "/search?q=a&type=track&offset=10&market=US"
  )
})

test("a search for artists reads the artists section", async () => {
  answering({ artists: pageOf([{ id: "one", name: "One" }], null) })
  expect(await searchPaginate("rock", "artist")).toEqual([{ id: "one", name: "One" }])
})

test("a null item is dropped while paging", async () => {
  answering({ playlists: pageOf([null, { id: "two", name: "Two" }], null) })
  expect(await searchPaginate("rock", "playlist")).toEqual([{ id: "two", name: "Two" }])
})

test("a section the answer omits stops the paging", async () => {
  answering({})
  expect(await searchPaginate("rock", "track")).toEqual([])
  expect(asked.length).toBe(1)
})

test("paging follows next and stops at the most it was asked for", async () => {
  answering(
    { tracks: pageOf([{ id: "one", name: "One" }], "https://api.spotify.com/v1/search?page=2") },
    { tracks: pageOf([{ id: "two", name: "Two" }], null) }
  )
  const found = await searchPaginate("rock", "track", { max: 1 })
  expect(found).toEqual([{ id: "one", name: "One" }])
  expect(asked.length).toBe(1)
})
