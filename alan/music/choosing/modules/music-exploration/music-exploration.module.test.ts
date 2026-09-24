import { describe, expect, test } from "bun:test"
import {
  type Catalog,
  type CatalogArtist,
  type CatalogSong,
  type CatalogTrack,
  isLiked,
  selectNextExploration,
} from "akasha/alan/music/choosing/modules/music-exploration/music-exploration.module.code.ts"
import { gradeProperty } from "akasha/page/grade-property/grade-property.page-type.ts"

function artist(slug: string, fields: Partial<CatalogArtist> = {}): CatalogArtist {
  return { slug, title: slug, ...fields }
}

function song(slug: string, artistSlug: string, fields: Partial<CatalogSong> = {}): CatalogSong {
  return { slug, artist: artistSlug, ...fields }
}

function track(slug: string, artistSlug: string, fields: Partial<CatalogTrack> = {}): CatalogTrack {
  return {
    slug,
    title: slug,
    artist: artistSlug,
    song: slug,
    spotifyId: `id-${slug}`,
    ...fields,
  }
}

function catalog(
  artists: readonly CatalogArtist[],
  tracks: readonly CatalogTrack[] = [],
  songs: readonly CatalogSong[] = []
): Catalog {
  return { artists, songs, tracks }
}

function trackOffered(held: Catalog): string | null {
  const answer = selectNextExploration(held)
  if (answer.kind === "track-in-liked-artist") return answer.track.slug
  if (answer.kind === "new-artist") return answer.firstTrack.slug
  return null
}

function artistOffered(held: Catalog): string | null {
  const answer = selectNextExploration(held)
  return answer.kind === "new-artist" ? answer.artist.slug : null
}

describe("isLiked", () => {
  test("likes B- and everything above it", () => {
    expect(isLiked("B-")).toBe(true)
    expect(isLiked("B+")).toBe(true)
    expect(isLiked("S+")).toBe(true)
  })

  test("does not like C+ or anything below it", () => {
    expect(isLiked("C+")).toBe(false)
    expect(isLiked("C")).toBe(false)
    expect(isLiked("F")).toBe(false)
  })

  test("does not like what Alan has not graded", () => {
    expect(isLiked(undefined)).toBe(false)
  })

  test("likes nine of the sixteen grades the ladder states", () => {
    expect(gradeProperty.values.length).toBe(16)
    expect(gradeProperty.values.filter((one) => isLiked(one)).length).toBe(9)
  })
})

describe("the track offered", () => {
  test("is the ungraded track that comes first by title", () => {
    const held = catalog(
      [artist("queen")],
      [
        track("queen-two", "queen", { title: "Bicycle Race" }),
        track("queen-one", "queen", { title: "Any Way You Like It" }),
      ]
    )
    expect(trackOffered(held)).toBe("queen-one")
  })

  test("settles a shared title by slug", () => {
    const held = catalog(
      [artist("queen")],
      [track("queen-b", "queen", { title: "One" }), track("queen-a", "queen", { title: "One" })]
    )
    expect(trackOffered(held)).toBe("queen-a")
  })

  test("skips a track Alan has already graded", () => {
    const held = catalog(
      [artist("queen")],
      [
        track("queen-one", "queen", { title: "Any Way You Like It", grade: "A" }),
        track("queen-two", "queen", { title: "Bicycle Race" }),
      ]
    )
    expect(trackOffered(held)).toBe("queen-two")
  })

  test("is offered whatever kind of recording it is", () => {
    const held = catalog(
      [artist("queen")],
      [
        track("queen-one", "queen", { title: "A Live At Wembley" }),
        track("queen-two", "queen", { title: "B Studio" }),
      ]
    )
    expect(trackOffered(held)).toBe("queen-one")
  })

  test("is nothing where every track is graded", () => {
    const held = catalog(
      [artist("queen", { grade: "A" })],
      [track("queen-one", "queen", { title: "One", grade: "C" })]
    )
    expect(trackOffered(held)).toBeNull()
  })

  test("is nothing where the artist has no track at all", () => {
    expect(trackOffered(catalog([artist("queen")]))).toBeNull()
  })

  test("is one track where two share a normalised title", () => {
    const held = catalog(
      [artist("queen")],
      [
        track("queen-one", "queen", { title: "Under Pressure" }),
        track("queen-one-2", "queen", { title: "under, pressure!" }),
        track("queen-two", "queen", { title: "Zed" }),
      ]
    )
    expect(trackOffered(held)).toBe("queen-one")
    const graded = catalog(held.artists, [
      track("queen-one", "queen", { title: "Under Pressure" }),
      track("queen-one-2", "queen", { title: "under, pressure!", grade: "A" }),
      track("queen-two", "queen", { title: "Zed" }),
    ])
    expect(trackOffered(graded)).toBe("queen-two")
  })

  test("keeps the studio recording on offer where Alan graded the live one down", () => {
    const held = catalog(
      [artist("queen", { grade: "A" })],
      [
        track("queen-studio", "queen", { title: "Popular", song: "queen-popular" }),
        track("queen-live", "queen", {
          title: "Popular - Live",
          song: "queen-popular",
          grade: "C",
        }),
      ],
      [song("queen-popular", "queen")]
    )
    expect(trackOffered(held)).toBe("queen-studio")
  })

  test("is a track of the artist that track names", () => {
    const held = catalog(
      [artist("queen"), artist("bowie")],
      [track("bowie-one", "bowie", { title: "Heroes" })]
    )
    const answer = selectNextExploration(held)
    if (answer.kind !== "new-artist") throw new Error("no artist was offered")
    expect(answer.artist.slug).toBe("bowie")
    expect(answer.firstTrack.slug).toBe("bowie-one")
  })
})

describe("the new artist offered", () => {
  test("is nothing where every artist is graded", () => {
    const held = catalog(
      [artist("queen", { grade: "F" })],
      [track("queen-one", "queen", { title: "One" })]
    )
    expect(artistOffered(held)).toBeNull()
  })

  test("counts an artist holding a graded track as no longer new", () => {
    const held = catalog(
      [artist("queen"), artist("bowie")],
      [
        track("queen-one", "queen", { title: "One", grade: "F" }),
        track("queen-two", "queen", { title: "Two" }),
        track("bowie-one", "bowie", { title: "Heroes" }),
      ]
    )
    expect(artistOffered(held)).toBe("bowie")
  })

  test("counts an artist holding only a song as still new", () => {
    const held = catalog(
      [artist("queen")],
      [track("queen-two", "queen", { title: "Two" })],
      [song("queen-one", "queen")]
    )
    expect(artistOffered(held)).toBe("queen")
  })

  test("is nothing where the new artist has no track left to offer", () => {
    const held = catalog([artist("queen")], [])
    expect(artistOffered(held)).toBeNull()
  })

  test("is the first new artist by title where none is loved", () => {
    const held = catalog(
      [artist("zed", { title: "Zed" }), artist("abe", { title: "Abe" })],
      [track("zed-one", "zed", { title: "One" }), track("abe-one", "abe", { title: "One" })]
    )
    expect(artistOffered(held)).toBe("abe")
  })

  test("is the new artist whose genres are most like a loved artist's", () => {
    const held = catalog(
      [
        artist("loved", { title: "Loved", grade: "A", genre: ["indie", "folk"] }),
        artist("zed", { title: "Zed", genre: ["indie", "folk"] }),
        artist("abe", { title: "Abe", genre: ["metal"] }),
      ],
      [
        track("loved-one", "loved", { title: "One", grade: "A" }),
        track("zed-one", "zed", { title: "One" }),
        track("abe-one", "abe", { title: "One" }),
      ]
    )
    expect(artistOffered(held)).toBe("zed")
  })

  test("settles a likeness tie by how many loved genres the artist names", () => {
    const held = catalog(
      [
        artist("lovedone", { title: "Loved One", grade: "A", genre: ["indie"] }),
        artist("lovedtwo", { title: "Loved Two", grade: "A", genre: ["folk"] }),
        artist("zed", { title: "Zed", genre: ["indie", "folk"] }),
        artist("abe", { title: "Abe", genre: ["indie", "metal"] }),
      ],
      [
        track("lovedone-one", "lovedone", { title: "One", grade: "A" }),
        track("lovedtwo-one", "lovedtwo", { title: "One", grade: "A" }),
        track("zed-one", "zed", { title: "One" }),
        track("abe-one", "abe", { title: "One" }),
      ]
    )
    expect(artistOffered(held)).toBe("zed")
  })
})

describe("selectNextExploration", () => {
  test("prefers a track by a liked artist over a new artist", () => {
    const held = catalog(
      [artist("loved", { title: "Loved", grade: "B+" }), artist("fresh", { title: "Fresh" })],
      [track("loved-one", "loved", { title: "One" }), track("fresh-one", "fresh", { title: "One" })]
    )
    const answer = selectNextExploration(held)
    expect(answer.kind).toBe("track-in-liked-artist")
    if (answer.kind !== "track-in-liked-artist") throw new Error("no track was offered")
    expect(answer.artist.slug).toBe("loved")
    expect(answer.track.slug).toBe("loved-one")
    expect(answer.track.spotifyId).toBe("id-loved-one")
  })

  test("counts an artist liked through one of their tracks", () => {
    const held = catalog(
      [artist("loved", { title: "Loved" }), artist("fresh", { title: "Fresh" })],
      [
        track("loved-one", "loved", { title: "One", grade: "A" }),
        track("loved-two", "loved", { title: "Two" }),
        track("fresh-one", "fresh", { title: "One" }),
      ]
    )
    const answer = selectNextExploration(held)
    expect(answer.kind).toBe("track-in-liked-artist")
    if (answer.kind !== "track-in-liked-artist") throw new Error("no track was offered")
    expect(answer.track.slug).toBe("loved-two")
  })

  test("offers from the artist loved most", () => {
    const held = catalog(
      [
        artist("lesser", { title: "Lesser", grade: "B-" }),
        artist("greater", { title: "Greater", grade: "A" }),
      ],
      [
        track("lesser-one", "lesser", { title: "One" }),
        track("greater-one", "greater", { title: "One" }),
      ]
    )
    const answer = selectNextExploration(held)
    if (answer.kind !== "track-in-liked-artist") throw new Error("no track was offered")
    expect(answer.artist.slug).toBe("greater")
  })

  test("weighs an artist's own grade over their count of liked tracks", () => {
    const held = catalog(
      [
        artist("many", { title: "Many", grade: "B-" }),
        artist("higher", { title: "Higher", grade: "B" }),
      ],
      [
        track("many-one", "many", { title: "One", grade: "S" }),
        track("many-two", "many", { title: "Two", grade: "S" }),
        track("many-three", "many", { title: "Three" }),
        track("higher-one", "higher", { title: "One" }),
      ]
    )
    const answer = selectNextExploration(held)
    if (answer.kind !== "track-in-liked-artist") throw new Error("no track was offered")
    expect(answer.artist.slug).toBe("higher")
  })

  test("weighs an artist Alan has not graded below one he graded `F`", () => {
    const held = catalog(
      [
        artist("nograde", { title: "A Nograde" }),
        artist("worst", { title: "B Worst", grade: "F" }),
      ],
      [
        track("nograde-one", "nograde", { title: "One", grade: "A" }),
        track("nograde-two", "nograde", { title: "Two" }),
        track("worst-one", "worst", { title: "One", grade: "A" }),
        track("worst-two", "worst", { title: "Two" }),
      ]
    )
    const answer = selectNextExploration(held)
    if (answer.kind !== "track-in-liked-artist") throw new Error("no track was offered")
    expect(answer.artist.slug).toBe("worst")
  })

  test("answers with a new artist where no liked artist has a track left", () => {
    const held = catalog(
      [artist("loved", { title: "Loved", grade: "A" }), artist("fresh", { title: "Fresh" })],
      [
        track("loved-one", "loved", { title: "One", grade: "A" }),
        track("fresh-one", "fresh", { title: "One" }),
      ]
    )
    const answer = selectNextExploration(held)
    expect(answer.kind).toBe("new-artist")
    if (answer.kind !== "new-artist") throw new Error("no artist was offered")
    expect(answer.artist.slug).toBe("fresh")
    expect(answer.firstTrack.slug).toBe("fresh-one")
  })

  test("answers exhausted where nothing is left to offer", () => {
    const held = catalog(
      [artist("loved", { title: "Loved", grade: "A" })],
      [track("loved-one", "loved", { title: "One", grade: "A" })]
    )
    expect(selectNextExploration(held).kind).toBe("exhausted")
  })

  test("answers exhausted for an empty catalogue", () => {
    expect(selectNextExploration(catalog([], [])).kind).toBe("exhausted")
  })
})
