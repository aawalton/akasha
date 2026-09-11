import { expect, test } from "bun:test"
import {
  SPOTIFY_SCOPE_STRING,
  SPOTIFY_SCOPES,
} from "akasha/alan/music/spotify/scopes/spotify-scopes.module.code.ts"

test("Spotify is given the scopes as one space-parted line", () => {
  expect(SPOTIFY_SCOPE_STRING).toBe(SPOTIFY_SCOPES.join(" "))
  expect(SPOTIFY_SCOPE_STRING.split(" ")).toEqual([...SPOTIFY_SCOPES])
})

test("consent is asked for once and covers every scope at once", () => {
  expect(new Set(SPOTIFY_SCOPES).size).toBe(SPOTIFY_SCOPES.length)
  expect(SPOTIFY_SCOPES.length).toBeGreaterThan(0)
})

test("no scope carries a space of its own", () => {
  for (const scope of SPOTIFY_SCOPES) {
    expect(scope).not.toContain(" ")
    expect(scope.length).toBeGreaterThan(0)
  }
})

test("the scopes the player is commanded under are asked for", () => {
  expect(SPOTIFY_SCOPES).toContain("user-read-playback-state")
  expect(SPOTIFY_SCOPES).toContain("user-modify-playback-state")
  expect(SPOTIFY_SCOPES).toContain("user-read-recently-played")
  expect(SPOTIFY_SCOPES).toContain("user-top-read")
})
