import { describe, expect, test } from "bun:test"
import type { SearchItem } from "@collections/music-spotify/endpoints/search"
import { matchesArtist, selectCandidates, toCandidate } from "./track-candidate"

function item(over: Record<string, unknown>): SearchItem {
  const base: SearchItem = {
    id: "t0",
    name: "Track",
    type: "track",
    uri: "spotify:track:t0",
    artists: [{ id: "a0", name: "Artist Zero" }],
    album: { id: "al0", name: "Album Zero" },
  }
  return { ...base, ...over }
}

describe("toCandidate", () => {
  test("surfaces trackName, artists (names), album, uri, id from a passthrough item", () => {
    const candidate = toCandidate(
      item({
        name: "Bulletproof",
        uri: "spotify:track:abc",
        id: "abc",
        artists: [
          { id: "1", name: "Em Beihold" },
          { id: "2", name: "Guest" },
        ],
        album: { id: "x", name: "Egg in the Backseat" },
      })
    )
    expect(candidate).toEqual({
      trackName: "Bulletproof",
      artists: ["Em Beihold", "Guest"],
      album: "Egg in the Backseat",
      uri: "spotify:track:abc",
      id: "abc",
    })
  })

  test("returns null for an item with no playable URI", () => {
    expect(toCandidate(item({ uri: undefined }))).toBeNull()
    expect(toCandidate(item({ uri: "" }))).toBeNull()
  })

  test("tolerates a missing album / empty artists", () => {
    const candidate = toCandidate(item({ album: undefined, artists: [] }))
    expect(candidate?.album).toBeNull()
    expect(candidate?.artists).toEqual([])
  })
})

describe("matchesArtist", () => {
  const c = toCandidate(item({ artists: [{ id: "1", name: "Em Beihold" }] }))
  test("is case-insensitive contains on artist names", () => {
    expect(c !== null && matchesArtist(c, "em beihold")).toBe(true)
    expect(c !== null && matchesArtist(c, "BEIHOLD")).toBe(true)
    expect(c !== null && matchesArtist(c, "La Roux")).toBe(false)
  })
})

describe("selectCandidates", () => {
  const items: SearchItem[] = [
    item({ id: "1", uri: "spotify:track:1", name: "Bulletproof", artists: [{ name: "La Roux" }] }),
    item({
      id: "2",
      uri: "spotify:track:2",
      name: "Bulletproof",
      artists: [{ name: "Em Beihold" }],
    }),
    item({ id: "3", uri: "spotify:track:3", name: "Bulletproof", artists: [{ name: "Godsmack" }] }),
  ]

  test("returns up to `limit` candidates when unconstrained", () => {
    expect(selectCandidates(items, undefined, 2)).toHaveLength(2)
  })

  test("restricts to the named artist (the repro: only Em Beihold's track survives)", () => {
    const out = selectCandidates(items, "Em Beihold", 5)
    expect(out).toHaveLength(1)
    expect(out[0]?.uri).toBe("spotify:track:2")
    expect(out[0]?.artists).toEqual(["Em Beihold"])
  })

  test("returns empty when no candidate matches the artist (caller declines — no wrong-artist play)", () => {
    expect(selectCandidates(items, "Nonexistent Artist", 5)).toEqual([])
  })
})
