import { expect, test } from "bun:test"
import {
  batchedInto,
  idsHeldIn,
  itemsPath,
  removalBodyFor,
  uriOf,
} from "akasha/alan/music/spotify/modules/playlists/spotify-playlists.module.code.ts"

const PLAYLIST = "2L6oEjIg7HpfRzv2FrfZcG"

test("a track reaches a playlist as a uri rather than as an id", () => {
  expect(uriOf("0isMBNGbFrpvGhStVQLWJK")).toBe("spotify:track:0isMBNGbFrpvGhStVQLWJK")
})

test("one call carries a hundred tracks at most", () => {
  const uris = Array.from({ length: 250 }, (_one, at) => `spotify:track:${at}`)
  const batches = batchedInto(uris)
  expect(batches.map((one) => one.length)).toEqual([100, 100, 50])
})

test("the tracks a playlist holds are read a page at a time until no page is left", () => {
  expect(itemsPath(PLAYLIST, 0)).toBe(`/playlists/${PLAYLIST}/items?limit=100&offset=0`)
  expect(itemsPath(PLAYLIST, 100)).toBe(`/playlists/${PLAYLIST}/items?limit=100&offset=100`)
})

test("the tracks a playlist holds are answered in the order the playlist holds them", () => {
  const items = [{ item: { uri: "spotify:track:two" } }, { item: { uri: "spotify:track:one" } }]
  expect(idsHeldIn(items)).toEqual(["two", "one"])
})

test("something a playlist holds that is no track is not answered for", () => {
  const items = [
    { item: { uri: "spotify:track:one" } },
    { item: { uri: "spotify:episode:two" } },
    { item: null },
    {},
    { item: { uri: "spotify:track:" } },
    { item: { uri: "spotify:track:three" } },
  ]
  expect(idsHeldIn(items)).toEqual(["one", "three"])
})

test("a track leaves a playlist as a uri, so every copy of that track leaves at once", () => {
  expect(removalBodyFor(["one", "two"])).toEqual({
    items: [{ uri: "spotify:track:one" }, { uri: "spotify:track:two" }],
  })
})

test("tracks reach the playlist in the order they were handed over", () => {
  const uris = Array.from({ length: 150 }, (_one, at) => `spotify:track:${at}`)
  expect(batchedInto(uris).flat()).toEqual(uris)
})

test("no call is made for no track at all", () => {
  expect(batchedInto([])).toEqual([])
})
