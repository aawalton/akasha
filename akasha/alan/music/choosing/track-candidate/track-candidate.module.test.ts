import { describe, expect, test } from "bun:test"
import type { SearchItem } from "@akasha/spotify/search"
import {
  matchesArtist,
  selectCandidates,
  toCandidate,
  toCandidates,
} from "./track-candidate.module.code.ts"

type Hit = {
  id: string | null
  name: string
  type: string
  uri?: string
  artists?: readonly { readonly name: string }[]
  album?: { readonly name: string }
}

function hit(name: string, fields: Partial<Hit> = {}): SearchItem {
  return { id: `id-${name}`, name, type: "track", uri: `spotify:track:${name}`, ...fields }
}

describe("toCandidate", () => {
  test("reads the name, the uri and the id off the hit", () => {
    const candidate = toCandidate(hit("motion"))
    expect(candidate?.trackName).toBe("motion")
    expect(candidate?.uri).toBe("spotify:track:motion")
    expect(candidate?.id).toBe("id-motion")
  })

  test("names every artist the hit names", () => {
    const candidate = toCandidate(
      hit("motion", { artists: [{ name: "Phoebe Bridgers" }, { name: "Conor Oberst" }] })
    )
    expect(candidate?.artists).toEqual(["Phoebe Bridgers", "Conor Oberst"])
  })

  test("names the album the hit names", () => {
    const candidate = toCandidate(hit("motion", { album: { name: "Stranger in the Alps" } }))
    expect(candidate?.album).toBe("Stranger in the Alps")
  })

  test("names no album where the hit names none", () => {
    expect(toCandidate(hit("motion"))?.album).toBeNull()
  })

  test("names no artist where the hit names none", () => {
    expect(toCandidate(hit("motion"))?.artists).toEqual([])
  })

  test("carries a null id through", () => {
    expect(toCandidate(hit("motion", { id: null }))?.id).toBeNull()
  })

  test("answers nothing for a hit naming no uri", () => {
    expect(toCandidate({ id: "id-motion", name: "motion", type: "track" })).toBeNull()
  })

  test("answers nothing for a hit whose uri is empty text", () => {
    expect(toCandidate(hit("motion", { uri: "" }))).toBeNull()
  })
})

describe("toCandidates", () => {
  test("drops every hit naming no uri and keeps the order", () => {
    const kept = toCandidates([
      hit("one"),
      { id: "id-two", name: "two", type: "track" },
      hit("three"),
    ])
    expect(kept.map((one) => one.trackName)).toEqual(["one", "three"])
  })
})

describe("matchesArtist", () => {
  const candidate = {
    trackName: "motion",
    artists: ["Phoebe Bridgers"],
    album: null,
    uri: "spotify:track:motion",
    id: "id-motion",
  }

  test("matches a name holding the text wanted", () => {
    expect(matchesArtist(candidate, "bridgers")).toBe(true)
  })

  test("matches without regard to case", () => {
    expect(matchesArtist(candidate, "PHOEBE")).toBe(true)
  })

  test("does not match a name holding none of the text wanted", () => {
    expect(matchesArtist(candidate, "bowie")).toBe(false)
  })
})

describe("selectCandidates", () => {
  const items = [
    hit("one", { artists: [{ name: "Phoebe Bridgers" }] }),
    hit("two", { artists: [{ name: "David Bowie" }] }),
    hit("three", { artists: [{ name: "Phoebe Bridgers" }] }),
  ]

  test("keeps only the candidates by the artist wanted", () => {
    const kept = selectCandidates(items, "bridgers", 5)
    expect(kept.map((one) => one.trackName)).toEqual(["one", "three"])
  })

  test("keeps every candidate where no artist is wanted", () => {
    expect(selectCandidates(items, undefined, 5).length).toBe(3)
  })

  test("keeps every candidate where the artist wanted is empty text", () => {
    expect(selectCandidates(items, "", 5).length).toBe(3)
  })

  test("keeps no more candidates than the limit", () => {
    expect(selectCandidates(items, undefined, 2).map((one) => one.trackName)).toEqual([
      "one",
      "two",
    ])
  })

  test("keeps nothing where the artist wanted matches no hit", () => {
    expect(selectCandidates(items, "queen", 5)).toEqual([])
  })
})
