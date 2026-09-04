import { describe, expect, test } from "bun:test"
import {
  type Catalog,
  type CatalogArtist,
  type CatalogSong,
  selectNextArtist,
  selectNextExploration,
  selectNextSong,
} from "./music-exploration.module.code.ts"

function artist(slug: string, fields: Partial<CatalogArtist> = {}): CatalogArtist {
  return { slug, title: slug, ...fields }
}

function song(slug: string, artistSlug: string, fields: Partial<CatalogSong> = {}): CatalogSong {
  return { slug, title: slug, artistSlug, songType: "original", performed: true, ...fields }
}

function catalog(artists: readonly CatalogArtist[], songs: readonly CatalogSong[] = []): Catalog {
  return { artists, songs }
}

describe("selectNextSong", () => {
  test("offers the ungraded song that comes first by title", () => {
    const held = catalog(
      [artist("queen")],
      [
        song("queen-two", "queen", { title: "Bicycle Race" }),
        song("queen-one", "queen", { title: "Any Way You Like It" }),
      ]
    )
    expect(selectNextSong(held, "queen")?.slug).toBe("queen-one")
  })

  test("settles a shared title by slug", () => {
    const held = catalog(
      [artist("queen")],
      [song("queen-b", "queen", { title: "One" }), song("queen-a", "queen", { title: "One" })]
    )
    expect(selectNextSong(held, "queen")?.slug).toBe("queen-a")
  })

  test("skips a song Alan has already graded", () => {
    const held = catalog(
      [artist("queen")],
      [
        song("queen-one", "queen", { title: "Any Way You Like It", rank: "A" }),
        song("queen-two", "queen", { title: "Bicycle Race" }),
      ]
    )
    expect(selectNextSong(held, "queen")?.slug).toBe("queen-two")
  })

  test("skips a song the artist did not write", () => {
    const held = catalog(
      [artist("queen")],
      [
        song("queen-one", "queen", { title: "A Cover", songType: "derivative" }),
        song("queen-two", "queen", { title: "B Own" }),
      ]
    )
    expect(selectNextSong(held, "queen")?.slug).toBe("queen-two")
  })

  test("skips a song the artist does not perform", () => {
    const held = catalog(
      [artist("queen")],
      [
        song("queen-one", "queen", { title: "A Unheard", performed: false }),
        song("queen-two", "queen", { title: "B Heard" }),
      ]
    )
    expect(selectNextSong(held, "queen")?.slug).toBe("queen-two")
  })

  test("offers nothing where every song is graded", () => {
    const held = catalog(
      [artist("queen")],
      [song("queen-one", "queen", { title: "One", rank: "C" })]
    )
    expect(selectNextSong(held, "queen")).toBeNull()
  })

  test("offers nothing where the artist has no song at all", () => {
    expect(selectNextSong(catalog([artist("queen")]), "queen")).toBeNull()
  })

  test("offers one song where two re-recordings share a normalised title", () => {
    const held = catalog(
      [artist("queen")],
      [
        song("queen-one", "queen", { title: "Under Pressure" }),
        song("queen-one-2", "queen", { title: "under, pressure!" }),
        song("queen-two", "queen", { title: "Zed" }),
      ]
    )
    const first = selectNextSong(held, "queen")
    expect(first?.slug).toBe("queen-one")
    const graded = catalog(held.artists, [
      song("queen-one", "queen", { title: "Under Pressure" }),
      song("queen-one-2", "queen", { title: "under, pressure!", rank: "A" }),
      song("queen-two", "queen", { title: "Zed" }),
    ])
    expect(selectNextSong(graded, "queen")?.slug).toBe("queen-two")
  })

  test("offers no re-recording of a song Alan has graded", () => {
    const held = catalog(
      [artist("queen")],
      [
        song("queen-one", "queen", { title: "Under Pressure", rank: "S" }),
        song("queen-one-2", "queen", { title: "Under Pressure" }),
      ]
    )
    expect(selectNextSong(held, "queen")).toBeNull()
  })

  test("offers only a song of the artist named", () => {
    const held = catalog(
      [artist("queen"), artist("bowie")],
      [song("bowie-one", "bowie", { title: "Heroes" })]
    )
    expect(selectNextSong(held, "queen")).toBeNull()
    expect(selectNextSong(held, "bowie")?.slug).toBe("bowie-one")
  })
})

describe("selectNextArtist", () => {
  test("offers nothing where every artist is graded", () => {
    const held = catalog(
      [artist("queen", { rank: "A" })],
      [song("queen-one", "queen", { title: "One" })]
    )
    expect(selectNextArtist(held)).toBeNull()
  })

  test("counts an artist holding a graded song as no longer new", () => {
    const held = catalog(
      [artist("queen"), artist("bowie")],
      [
        song("queen-one", "queen", { title: "One", rank: "F" }),
        song("queen-two", "queen", { title: "Two" }),
        song("bowie-one", "bowie", { title: "Heroes" }),
      ]
    )
    expect(selectNextArtist(held)?.slug).toBe("bowie")
  })

  test("offers nothing where the new artist has no song left to offer", () => {
    const held = catalog([artist("queen")], [])
    expect(selectNextArtist(held)).toBeNull()
  })

  test("offers the first new artist by title where none is loved", () => {
    const held = catalog(
      [artist("zed", { title: "Zed" }), artist("abe", { title: "Abe" })],
      [song("zed-one", "zed", { title: "One" }), song("abe-one", "abe", { title: "One" })]
    )
    expect(selectNextArtist(held)?.slug).toBe("abe")
  })

  test("prefers the new artist whose genres are most like a loved artist's", () => {
    const held = catalog(
      [
        artist("loved", { title: "Loved", rank: "A", genre: ["indie", "folk"] }),
        artist("zed", { title: "Zed", genre: ["indie", "folk"] }),
        artist("abe", { title: "Abe", genre: ["metal"] }),
      ],
      [
        song("loved-one", "loved", { title: "One" }),
        song("zed-one", "zed", { title: "One" }),
        song("abe-one", "abe", { title: "One" }),
      ]
    )
    expect(selectNextArtist(held)?.slug).toBe("zed")
  })

  test("settles a likeness tie by how many loved genres the artist names", () => {
    const held = catalog(
      [
        artist("lovedone", { title: "Loved One", rank: "A", genre: ["indie"] }),
        artist("lovedtwo", { title: "Loved Two", rank: "A", genre: ["folk"] }),
        artist("zed", { title: "Zed", genre: ["indie", "folk"] }),
        artist("abe", { title: "Abe", genre: ["indie", "metal"] }),
      ],
      [
        song("lovedone-one", "lovedone", { title: "One" }),
        song("lovedtwo-one", "lovedtwo", { title: "One" }),
        song("zed-one", "zed", { title: "One" }),
        song("abe-one", "abe", { title: "One" }),
      ]
    )
    expect(selectNextArtist(held)?.slug).toBe("zed")
  })
})

describe("selectNextExploration", () => {
  test("prefers a song by a liked artist over a new artist", () => {
    const held = catalog(
      [artist("loved", { title: "Loved", rank: "B+" }), artist("fresh", { title: "Fresh" })],
      [song("loved-one", "loved", { title: "One" }), song("fresh-one", "fresh", { title: "One" })]
    )
    const answer = selectNextExploration(held)
    expect(answer.kind).toBe("song-in-liked-artist")
    if (answer.kind !== "song-in-liked-artist") throw new Error("no song was offered")
    expect(answer.artist.slug).toBe("loved")
    expect(answer.song.slug).toBe("loved-one")
  })

  test("counts an artist liked through one of their songs", () => {
    const held = catalog(
      [artist("loved", { title: "Loved" }), artist("fresh", { title: "Fresh" })],
      [
        song("loved-one", "loved", { title: "One", rank: "A" }),
        song("loved-two", "loved", { title: "Two" }),
        song("fresh-one", "fresh", { title: "One" }),
      ]
    )
    const answer = selectNextExploration(held)
    expect(answer.kind).toBe("song-in-liked-artist")
    if (answer.kind !== "song-in-liked-artist") throw new Error("no song was offered")
    expect(answer.song.slug).toBe("loved-two")
  })

  test("offers from the artist loved most", () => {
    const held = catalog(
      [
        artist("lesser", { title: "Lesser", rank: "B-" }),
        artist("greater", { title: "Greater", rank: "A" }),
      ],
      [
        song("lesser-one", "lesser", { title: "One" }),
        song("greater-one", "greater", { title: "One" }),
      ]
    )
    const answer = selectNextExploration(held)
    if (answer.kind !== "song-in-liked-artist") throw new Error("no song was offered")
    expect(answer.artist.slug).toBe("greater")
  })

  test("weighs an artist's own grade over their count of liked songs", () => {
    const held = catalog(
      [
        artist("many", { title: "Many", rank: "B-" }),
        artist("higher", { title: "Higher", rank: "B" }),
      ],
      [
        song("many-one", "many", { title: "One", rank: "S" }),
        song("many-two", "many", { title: "Two", rank: "S" }),
        song("many-three", "many", { title: "Three" }),
        song("higher-one", "higher", { title: "One" }),
      ]
    )
    const answer = selectNextExploration(held)
    if (answer.kind !== "song-in-liked-artist") throw new Error("no song was offered")
    expect(answer.artist.slug).toBe("higher")
  })

  test("answers with a new artist where no liked artist has a song left", () => {
    const held = catalog(
      [artist("loved", { title: "Loved", rank: "A" }), artist("fresh", { title: "Fresh" })],
      [
        song("loved-one", "loved", { title: "One", rank: "A" }),
        song("fresh-one", "fresh", { title: "One" }),
      ]
    )
    const answer = selectNextExploration(held)
    expect(answer.kind).toBe("new-artist")
    if (answer.kind !== "new-artist") throw new Error("no artist was offered")
    expect(answer.artist.slug).toBe("fresh")
    expect(answer.firstSong.slug).toBe("fresh-one")
  })

  test("answers exhausted where nothing is left to offer", () => {
    const held = catalog(
      [artist("loved", { title: "Loved", rank: "A" })],
      [song("loved-one", "loved", { title: "One", rank: "A" })]
    )
    expect(selectNextExploration(held).kind).toBe("exhausted")
  })

  test("answers exhausted for an empty catalogue", () => {
    expect(selectNextExploration(catalog([], [])).kind).toBe("exhausted")
  })
})
