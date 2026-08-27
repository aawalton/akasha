import { describe, expect, it } from "bun:test"
import {
  artistExternalLink,
  dedupeRecordings,
  deriveSongType,
  deriveSongTypeFromTitle,
  deriveWritten,
  extractGenres,
  isSongWork,
  mbArtistToProps,
  mbRecordingToSongProps,
  mbWorkToSongProps,
  performedWorkIds,
  pickBestArtist,
  recordingExternalLink,
  workExternalLink,
} from "./map"
import type { MbArtist, MbArtistSearchHit, MbRecording, MbRelation, MbWork } from "./schemas"

function rec(id: string, title: string | null): MbRecording {
  return { id, title, relations: [] }
}

function hit(
  partial: Partial<MbArtistSearchHit> & { id: string; name: string }
): MbArtistSearchHit {
  return { type: null, country: null, disambiguation: null, score: null, ...partial }
}

const TS_MBID = "ts-mbid"

function writerRel(type: string, artistId: string): MbRelation {
  return {
    type,
    direction: "backward",
    "target-type": "artist",
    artist: { id: artistId, name: artistId },
    work: null,
  }
}

function versionRel(type: string, direction: string): MbRelation {
  return {
    type,
    direction,
    "target-type": "work",
    artist: null,
    work: { id: "orig", title: "Original", disambiguation: null },
  }
}

function workWith(relations: readonly MbRelation[]): MbWork {
  return { id: "w", title: "t", type: "Song", disambiguation: null, relations: [...relations] }
}

function performanceRel(workId: string): MbRelation {
  return {
    type: "performance",
    direction: "forward",
    "target-type": "work",
    artist: null,
    work: { id: workId, title: workId, disambiguation: null },
  }
}

function recordingWith(id: string, relations: readonly MbRelation[]): MbRecording {
  return { id, title: id, relations: [...relations] }
}

describe("pickBestArtist", () => {
  it("returns undefined for no hits", () => {
    expect(pickBestArtist([], "Taylor Swift")).toBeUndefined()
  })

  it("prefers an exact (case-insensitive) name match over a higher-scoring non-exact hit", () => {
    const hits = [
      hit({ id: "a", name: "Taylor Swift Tribute Band", score: 100 }),
      hit({ id: "b", name: "taylor swift", score: 80 }),
    ]
    expect(pickBestArtist(hits, "Taylor Swift")?.id).toBe("b")
  })

  it("breaks non-exact ties by highest score", () => {
    const hits = [
      hit({ id: "a", name: "Swift", score: 50 }),
      hit({ id: "b", name: "Swifty", score: 90 }),
    ]
    expect(pickBestArtist(hits, "Taylor Swift")?.id).toBe("b")
  })

  it("among multiple exact matches picks the highest score", () => {
    const hits = [
      hit({ id: "a", name: "Taylor Swift", score: 70 }),
      hit({ id: "b", name: "Taylor Swift", score: 99 }),
    ]
    expect(pickBestArtist(hits, "Taylor Swift")?.id).toBe("b")
  })
})

describe("extractGenres", () => {
  const artist: MbArtist = {
    id: "x",
    name: "Taylor Swift",
    type: "Person",
    country: "US",
    genres: [
      { name: "pop", count: 38 },
      { name: "country", count: 24 },
      { name: "indie folk", count: 3 },
    ],
  }

  it("orders by count descending and maps to names", () => {
    expect(extractGenres(artist)).toEqual(["pop", "country", "indie folk"])
  })

  it("caps the number of genres", () => {
    expect(extractGenres(artist, 2)).toEqual(["pop", "country"])
  })

  it("treats missing counts as zero", () => {
    const a: MbArtist = {
      ...artist,
      genres: [
        { name: "a", count: null },
        { name: "b", count: 5 },
      ],
    }
    expect(extractGenres(a)).toEqual(["b", "a"])
  })
})

describe("isSongWork", () => {
  const work = (type: string | null): MbWork => ({
    id: "w",
    title: "t",
    type,
    disambiguation: null,
    relations: [],
  })
  it("includes works typed Song", () => expect(isSongWork(work("Song"))).toBe(true))
  it("includes untyped works", () => expect(isSongWork(work(null))).toBe(true))
  it("excludes other explicit work types", () => expect(isSongWork(work("Symphony"))).toBe(false))
})

describe("deriveWritten", () => {
  it("solo when the artist is the sole credited writer", () => {
    expect(deriveWritten(workWith([writerRel("writer", TS_MBID)]), TS_MBID)).toBe("solo")
  })

  it("collab when the artist is one of several credited writers", () => {
    expect(
      deriveWritten(
        workWith([writerRel("composer", TS_MBID), writerRel("composer", "other")]),
        TS_MBID
      )
    ).toBe("collab")
  })

  it("null when the artist holds no writing credit (cover)", () => {
    expect(deriveWritten(workWith([writerRel("composer", "other")]), TS_MBID)).toBeNull()
  })

  it("null when there are no writing credits at all", () => {
    expect(deriveWritten(workWith([]), TS_MBID)).toBeNull()
  })

  it("ignores non-writing artist relations (e.g. arranger)", () => {
    expect(deriveWritten(workWith([writerRel("arranger", TS_MBID)]), TS_MBID)).toBeNull()
  })
})

describe("deriveSongType", () => {
  it("original when the artist wrote it and it is not an alternate version", () => {
    expect(deriveSongType(workWith([writerRel("writer", TS_MBID)]), "solo")).toBe("original")
  })

  it("derivative when the work points backward to a canonical version", () => {
    expect(
      deriveSongType(
        workWith([writerRel("writer", TS_MBID), versionRel("other version", "backward")]),
        "solo"
      )
    ).toBe("derivative")
  })

  it("original when the version relation points forward (this is the canonical)", () => {
    expect(
      deriveSongType(
        workWith([writerRel("writer", TS_MBID), versionRel("other version", "forward")]),
        "collab"
      )
    ).toBe("original")
  })

  it("derivative when written is null (a cover folds into derivative)", () => {
    expect(deriveSongType(workWith([writerRel("composer", "other")]), null)).toBe("derivative")
  })
})

describe("performedWorkIds", () => {
  it("collects work ids from performance relations across recordings", () => {
    const recs = [
      recordingWith("r1", [performanceRel("w1")]),
      recordingWith("r2", [performanceRel("w2"), performanceRel("w1")]),
    ]
    const ids = performedWorkIds(recs)
    expect([...ids].sort()).toEqual(["w1", "w2"])
  })

  it("ignores non-performance relations", () => {
    const recs = [recordingWith("r1", [versionRel("other version", "forward")])]
    expect(performedWorkIds(recs).size).toBe(0)
  })

  it("returns an empty set for no recordings", () => {
    expect(performedWorkIds([]).size).toBe(0)
  })
})

describe("external links", () => {
  it("builds artist and work URLs", () => {
    expect(artistExternalLink("abc")).toBe("https://musicbrainz.org/artist/abc")
    expect(workExternalLink("xyz")).toBe("https://musicbrainz.org/work/xyz")
  })

  it("builds recording URLs", () => {
    expect(recordingExternalLink("rec1")).toBe("https://musicbrainz.org/recording/rec1")
  })
})

describe("deriveSongTypeFromTitle", () => {
  it("original for a plain title", () => {
    expect(deriveSongTypeFromTitle("Radio")).toBe("original")
    expect(deriveSongTypeFromTitle("Sisyphus")).toBe("original")
  })

  it("derivative when a parenthetical segment carries a version keyword", () => {
    expect(deriveSongTypeFromTitle("Radio (Hekler Remix, Extended Mix)")).toBe("derivative")
    expect(deriveSongTypeFromTitle("He Loves Me, He Loves Me Not (Stripped)")).toBe("derivative")
    expect(deriveSongTypeFromTitle("Champagne (Acoustic)")).toBe("derivative")
    expect(deriveSongTypeFromTitle("Afterglow (Live)")).toBe("derivative")
  })

  it("derivative when a bracketed segment carries a version keyword", () => {
    expect(deriveSongTypeFromTitle("Song [Demo]")).toBe("derivative")
  })

  it("original when a version-like word appears outside brackets (no false positive)", () => {
    expect(deriveSongTypeFromTitle("Live to Tell")).toBe("original")
    expect(deriveSongTypeFromTitle("Edit of My Ways")).toBe("original")
  })

  it("original when a parenthetical carries no version keyword", () => {
    expect(
      deriveSongTypeFromTitle("Calling on the Wind (Tavern Talk Original Game Soundtrack)")
    ).toBe("original")
  })
})

describe("dedupeRecordings", () => {
  it("collapses recordings with the same normalized title, choosing the min-MBID recording's title", () => {
    const out = dedupeRecordings([
      rec("r3", "Ferrari"),
      rec("r1", "ferrari"),
      rec("r2", "FERRARI!"),
    ])
    expect(out).toEqual([{ title: "ferrari", recordingId: "r1" }])
  })

  it("keeps recordings with distinct normalized titles separate", () => {
    const out = dedupeRecordings([rec("r1", "Radio"), rec("r2", "Radio (Krupa Remix)")])
    expect(out.map((e) => e.title).sort()).toEqual(["Radio", "Radio (Krupa Remix)"])
  })

  it("skips recordings with null or empty titles", () => {
    const out = dedupeRecordings([rec("r1", null), rec("r2", ""), rec("r3", "Atlas")])
    expect(out).toEqual([{ title: "Atlas", recordingId: "r3" }])
  })

  it("returns an empty array for no recordings", () => {
    expect(dedupeRecordings([])).toEqual([])
  })

  it("is order-independent and deterministic", () => {
    const a = dedupeRecordings([rec("rb", "Born to Die"), rec("ra", "Atlas")])
    const b = dedupeRecordings([rec("ra", "Atlas"), rec("rb", "Born to Die")])
    expect(a).toEqual(b)
  })
})

describe("mbRecordingToSongProps", () => {
  it("stamps performed=true, omits written, derives song-type from the title", () => {
    const props = mbRecordingToSongProps({
      title: "Ferrari",
      recordingId: "rec-1",
      artistSlug: "aurora",
      today: "2026-06-07",
    })
    expect(props).toEqual({
      title: "Ferrari",
      "external-id": "rec-1",
      "external-link": "https://musicbrainz.org/recording/rec-1",
      source: "musicbrainz",
      performed: true,
      "song-type": "original",
      "artist-slug": "aurora",
      "last-synced-at": "2026-06-07",
    })
  })

  it("marks a bracketed-version title derivative", () => {
    const props = mbRecordingToSongProps({
      title: "Radio (Krupa Remix)",
      recordingId: "rec-2",
      artistSlug: "aurora",
      today: "2026-06-07",
    })
    expect(props).toMatchObject({ performed: true, "song-type": "derivative" })
  })
})

describe("mbArtistToProps", () => {
  it("maps to the artist page property shape", () => {
    const props = mbArtistToProps({
      mbid: "mb1",
      name: "Taylor Swift",
      genres: ["pop", "country"],
      today: "2026-06-07",
    })
    expect(props).toEqual({
      title: "Taylor Swift",
      "external-id": "mb1",
      "external-link": "https://musicbrainz.org/artist/mb1",
      source: "musicbrainz",
      genre: ["pop", "country"],
      "last-synced-at": "2026-06-07",
    })
  })
})

describe("mbWorkToSongProps", () => {
  it("stamps written/performed/song-type for a performed solo original", () => {
    const props = mbWorkToSongProps({
      work: {
        id: "w1",
        title: "Afterglow",
        type: "Song",
        disambiguation: null,
        relations: [writerRel("writer", TS_MBID)],
      },
      artistSlug: "aurora",
      artistMbid: TS_MBID,
      performed: true,
      today: "2026-06-07",
    })
    expect(props).toEqual({
      title: "Afterglow",
      "external-id": "w1",
      "external-link": "https://musicbrainz.org/work/w1",
      source: "musicbrainz",
      written: "solo",
      performed: true,
      "song-type": "original",
      "artist-slug": "aurora",
      "last-synced-at": "2026-06-07",
    })
  })

  it("omits written and marks song-type derivative for a performed cover", () => {
    const props = mbWorkToSongProps({
      work: {
        id: "w2",
        title: "Riptide",
        type: "Song",
        disambiguation: null,
        relations: [writerRel("composer", "other")],
      },
      artistSlug: "aurora",
      artistMbid: TS_MBID,
      performed: true,
      today: "2026-06-07",
    })
    expect(props.written).toBeUndefined()
    expect(props).toMatchObject({ performed: true, "song-type": "derivative" })
  })
})
