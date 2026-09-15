import { expect, test } from "bun:test"
import { buildSearchPath } from "akasha/alan/music/spotify/modules/search/spotify-search.module.code.ts"

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
