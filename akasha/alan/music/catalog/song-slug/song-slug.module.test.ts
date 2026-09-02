import { describe, expect, test } from "bun:test"
import {
  artistSlugOf,
  mintSongSlug,
  slugifyName,
  songNamesFrom,
  songSlugBase,
  songSlugFor,
} from "./song-slug.module.code.ts"

describe("slugifyName", () => {
  test("lowercases and joins words with a dash", () => {
    expect(slugifyName("Bohemian Rhapsody")).toBe("bohemian-rhapsody")
  })

  test("folds a diacritic off its letter", () => {
    expect(slugifyName("Björk")).toBe("bjork")
    expect(slugifyName("Beyoncé")).toBe("beyonce")
    expect(slugifyName("Sigur Rós")).toBe("sigur-ros")
  })

  test("turns a run of punctuation into one dash", () => {
    expect(slugifyName("Hello... World!!! Again")).toBe("hello-world-again")
    expect(slugifyName("A/B & C")).toBe("a-b-c")
  })

  test("carries no dash at either end", () => {
    expect(slugifyName("  (Reprise)  ")).toBe("reprise")
    expect(slugifyName("!!!Wow!!!")).toBe("wow")
  })

  test("keeps digits", () => {
    expect(slugifyName("99 Problems")).toBe("99-problems")
  })

  test("slugs an empty title as untitled", () => {
    expect(slugifyName("")).toBe("untitled")
  })

  test("slugs a title with no letter and no digit as untitled", () => {
    expect(slugifyName("???")).toBe("untitled")
    expect(slugifyName("   ")).toBe("untitled")
    expect(slugifyName("日本語")).toBe("untitled")
  })
})

describe("artistSlugOf", () => {
  test("is the artist's name slugged", () => {
    expect(artistSlugOf("The Beatles")).toBe("the-beatles")
    expect(artistSlugOf("Sigur Rós")).toBe("sigur-ros")
  })
})

describe("songSlugBase", () => {
  test("is the artist slug followed by the slugged title", () => {
    expect(songSlugBase("queen", "Bohemian Rhapsody")).toBe("queen-bohemian-rhapsody")
  })

  test("is the artist slug followed by untitled when the title slugs to nothing", () => {
    expect(songSlugBase("queen", "")).toBe("queen-untitled")
  })
})

describe("mintSongSlug", () => {
  test("gives the base when the base is free", () => {
    expect(mintSongSlug("queen", "Bohemian Rhapsody", new Set())).toBe("queen-bohemian-rhapsody")
  })

  test("gives the base numbered two when the base is taken", () => {
    const taken = new Set(["queen-bohemian-rhapsody"])
    expect(mintSongSlug("queen", "Bohemian Rhapsody", taken)).toBe("queen-bohemian-rhapsody-2")
  })

  test("takes the next free number rather than the count taken", () => {
    const taken = new Set([
      "queen-bohemian-rhapsody",
      "queen-bohemian-rhapsody-2",
      "queen-bohemian-rhapsody-4",
    ])
    expect(mintSongSlug("queen", "Bohemian Rhapsody", taken)).toBe("queen-bohemian-rhapsody-3")
  })

  test("never gives the base numbered one", () => {
    const taken = new Set(["queen-under-pressure"])
    expect(mintSongSlug("queen", "Under Pressure", taken)).not.toBe("queen-under-pressure-1")
  })

  test("throws once a thousand collisions sit on one base", () => {
    const taken = new Set(["queen-one"])
    for (let nth = 2; nth <= 1000; nth += 1) taken.add(`queen-one-${nth}`)
    expect(() => mintSongSlug("queen", "One", taken)).toThrow(/1000 songs are already filed/)
  })
})

describe("songNamesFrom", () => {
  test("takes every slug and files the ones naming an external id", () => {
    const names = songNamesFrom([
      { slug: "queen-one", externalId: "mbid-one" },
      { slug: "queen-two", externalId: null },
      { slug: "queen-three" },
      { slug: "", externalId: "mbid-nothing" },
    ])
    expect([...names.taken].sort()).toEqual(["queen-one", "queen-three", "queen-two"])
    expect(names.filed.get("mbid-one")).toBe("queen-one")
    expect(names.filed.has("mbid-nothing")).toBe(false)
  })
})

describe("songSlugFor", () => {
  test("keeps the name an existing song already has", () => {
    const names = songNamesFrom([{ slug: "queen-bo-rhap", externalId: "mbid-one" }])
    expect(songSlugFor(names, "queen", "Bohemian Rhapsody", "mbid-one")).toBe("queen-bo-rhap")
  })

  test("keeps the existing name even where the title slugs to something else", () => {
    const names = songNamesFrom([{ slug: "queen-old-name", externalId: "mbid-one" }])
    songSlugFor(names, "queen", "A Wholly Different Title", "mbid-one")
    expect(names.taken.has("queen-a-wholly-different-title")).toBe(false)
  })

  test("gives a name to a song the catalogue does not hold", () => {
    const names = songNamesFrom([])
    expect(songSlugFor(names, "queen", "Bohemian Rhapsody", "mbid-one")).toBe(
      "queen-bohemian-rhapsody"
    )
  })

  test("takes the name it gave so a later song collides with it", () => {
    const names = songNamesFrom([])
    expect(songSlugFor(names, "queen", "One", "mbid-one")).toBe("queen-one")
    expect(songSlugFor(names, "queen", "One", "mbid-two")).toBe("queen-one-2")
  })

  test("gives the same name twice for the same external id", () => {
    const names = songNamesFrom([])
    const first = songSlugFor(names, "queen", "One", "mbid-one")
    expect(songSlugFor(names, "queen", "One", "mbid-one")).toBe(first)
  })
})
