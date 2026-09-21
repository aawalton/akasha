import { expect, test } from "bun:test"
import {
  batchedInto,
  bodyFor,
  uriOf,
} from "akasha/alan/music/spotify/modules/playlists/spotify-playlists.module.code.ts"

test("a track reaches a playlist as a uri rather than as an id", () => {
  expect(uriOf("0isMBNGbFrpvGhStVQLWJK")).toBe("spotify:track:0isMBNGbFrpvGhStVQLWJK")
})

test("a playlist made here is private", () => {
  expect(bodyFor({ name: "Unheard" })).toEqual({ name: "Unheard", public: false })
})

test("a description is named only where one was given", () => {
  expect(bodyFor({ name: "Unheard", description: "what Alan has not heard" })).toEqual({
    name: "Unheard",
    public: false,
    description: "what Alan has not heard",
  })
})

test("one call adds a hundred tracks at most", () => {
  const uris = Array.from({ length: 250 }, (_one, at) => `spotify:track:${at}`)
  const batches = batchedInto(uris)
  expect(batches.map((one) => one.length)).toEqual([100, 100, 50])
})

test("tracks reach the playlist in the order they were handed over", () => {
  const uris = Array.from({ length: 150 }, (_one, at) => `spotify:track:${at}`)
  expect(batchedInto(uris).flat()).toEqual(uris)
})

test("no call is made for no track at all", () => {
  expect(batchedInto([])).toEqual([])
})
