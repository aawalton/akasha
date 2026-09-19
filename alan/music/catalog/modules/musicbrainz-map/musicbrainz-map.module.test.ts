import { describe, expect, test } from "bun:test"
import {
  dedupeRecordings,
  deriveSongType,
  deriveSongTypeFromTitle,
  deriveWritten,
  extractGenres,
  identityHeld,
  isSongWork,
  mbArtistIdentity,
  mbArtistToFields,
  mbRecordingToSongFields,
  mbWorkToSongFields,
  performedWorkIds,
  pickBestArtist,
  songIdIn,
} from "akasha/alan/music/catalog/modules/musicbrainz-map/musicbrainz-map.module.code.ts"
import {
  BOWIE,
  hit,
  QUEEN,
  recording,
  versionRel,
  work,
  writerRel,
} from "akasha/alan/music/catalog/modules/musicbrainz-map/musicbrainz-map.module.test-fixtures.ts"
import type {
  MbArtist,
  MbRelation,
} from "akasha/alan/music/catalog/modules/musicbrainz-schema/musicbrainz-schema.module.code.ts"

describe("pickBestArtist", () => {
  test("answers nothing when nothing was found", () => {
    expect(pickBestArtist([], "Queen")).toBeUndefined()
  })

  test("takes the only hit whatever its score", () => {
    expect(pickBestArtist([hit("Queens of the Stone Age", 40)], "Queen")?.name).toBe(
      "Queens of the Stone Age"
    )
  })

  test("takes the exact name over a hit scored higher", () => {
    const best = pickBestArtist([hit("Queens of the Stone Age", 100), hit("Queen", 60)], "Queen")
    expect(best?.name).toBe("Queen")
  })

  test("keeps the exact name already held over a later inexact hit", () => {
    const best = pickBestArtist([hit("Queen", 60), hit("Queensryche", 100)], "Queen")
    expect(best?.name).toBe("Queen")
  })

  test("takes the higher score among hits alike on exactness", () => {
    const best = pickBestArtist([hit("Queensryche", 40), hit("Queens of Noise", 90)], "Queen")
    expect(best?.name).toBe("Queens of Noise")
  })

  test("reads a missing score as zero", () => {
    const best = pickBestArtist(
      [{ id: "a", name: "Alpha" }, hit("Beta", 1)],
      "Nothing In Particular"
    )
    expect(best?.name).toBe("Beta")
  })

  test("matches the query with its case and spacing set aside", () => {
    const best = pickBestArtist([hit("Sparks", 10), hit("QUEEN", 5)], "  queen  ")
    expect(best?.name).toBe("QUEEN")
  })
})

describe("extractGenres", () => {
  const artist = (genres: { name: string; count?: number | null }[]): MbArtist => ({
    id: QUEEN,
    name: "Queen",
    genres,
  })

  test("orders genres by how often they were counted", () => {
    expect(
      extractGenres(
        artist([
          { name: "pop", count: 2 },
          { name: "rock", count: 9 },
        ])
      )
    ).toEqual(["rock", "pop"])
  })

  test("takes eight genres at most", () => {
    const many = Array.from({ length: 12 }, (_, nth) => ({ name: `g${nth}`, count: 100 - nth }))
    expect(extractGenres(artist(many))).toEqual(["g0", "g1", "g2", "g3", "g4", "g5", "g6", "g7"])
  })

  test("reads a missing count as zero", () => {
    expect(extractGenres(artist([{ name: "unranked" }, { name: "rock", count: 1 }]))).toEqual([
      "rock",
      "unranked",
    ])
  })

  test("leaves the artist's own list untouched", () => {
    const held = artist([
      { name: "pop", count: 2 },
      { name: "rock", count: 9 },
    ])
    extractGenres(held)
    expect(held.genres[0]?.name).toBe("pop")
  })
})

describe("isSongWork", () => {
  test("reads a work with no type as a song", () => {
    expect(isSongWork(work("w1", "Untyped"))).toBe(true)
  })

  test("reads a work typed Song as a song", () => {
    expect(isSongWork({ ...work("w1", "Typed"), type: "Song" })).toBe(true)
  })

  test("reads a work typed otherwise as no song", () => {
    expect(isSongWork({ ...work("w1", "Aria"), type: "Aria" })).toBe(false)
  })
})

describe("deriveWritten", () => {
  test("answers nothing where the artist is no writer", () => {
    expect(deriveWritten(work("w1", "Song", [writerRel(BOWIE)]), QUEEN)).toBeNull()
  })

  test("answers nothing where the work names no writer", () => {
    expect(deriveWritten(work("w1", "Song"), QUEEN)).toBeNull()
  })

  test("answers solo where the artist is the only writer", () => {
    expect(deriveWritten(work("w1", "Song", [writerRel(QUEEN)]), QUEEN)).toBe("solo")
  })

  test("answers solo where the artist is named twice over", () => {
    const relations = [writerRel(QUEEN, "writer"), writerRel(QUEEN, "composer")]
    expect(deriveWritten(work("w1", "Song", relations), QUEEN)).toBe("solo")
  })

  test("answers collab where the artist writes with another", () => {
    const relations = [writerRel(QUEEN), writerRel(BOWIE, "lyricist")]
    expect(deriveWritten(work("w1", "Song", relations), QUEEN)).toBe("collab")
  })

  test("reads a producer as no writer", () => {
    expect(deriveWritten(work("w1", "Song", [writerRel(QUEEN, "producer")]), QUEEN)).toBeNull()
  })

  test("reads a writer relation pointing at a work rather than an artist as no writer", () => {
    const rel: MbRelation = {
      type: "writer",
      "target-type": "work",
      artist: { id: QUEEN, name: "Queen" },
    }
    expect(deriveWritten(work("w1", "Song", [rel]), QUEEN)).toBeNull()
  })
})

describe("deriveSongType", () => {
  test("states nothing where nothing names who wrote it", () => {
    expect(deriveSongType(work("w1", "Song"), null)).toBeNull()
  })

  test("is derivative where a work nobody names a writer of is a version of another", () => {
    const held = work("w1", "Song", [versionRel("other version", "backward")])
    expect(deriveSongType(held, null)).toBe("derivative")
  })

  test("is original where the artist wrote it and it is no version of another", () => {
    expect(deriveSongType(work("w1", "Song", [writerRel(QUEEN)]), "solo")).toBe("original")
  })

  test("is derivative where the work is another version of an earlier work", () => {
    const held = work("w1", "Song", [versionRel("other version", "backward")])
    expect(deriveSongType(held, "solo")).toBe("derivative")
  })

  test("is derivative where the work is based on an earlier work", () => {
    const held = work("w1", "Song", [versionRel("based on", "backward")])
    expect(deriveSongType(held, "collab")).toBe("derivative")
  })

  test("is original where the earlier work points forward at this one", () => {
    const held = work("w1", "Song", [versionRel("other version", "forward")])
    expect(deriveSongType(held, "solo")).toBe("original")
  })
})

describe("deriveSongTypeFromTitle", () => {
  test("is original where the title brackets nothing", () => {
    expect(deriveSongTypeFromTitle("Bohemian Rhapsody")).toBe("original")
  })

  test("is derivative where a round bracket holds a version word", () => {
    expect(deriveSongTypeFromTitle("Under Pressure (Live)")).toBe("derivative")
    expect(deriveSongTypeFromTitle("Under Pressure (2011 Remaster)")).toBe("derivative")
  })

  test("is derivative where a square bracket holds a version word", () => {
    expect(deriveSongTypeFromTitle("Under Pressure [Acoustic Version]")).toBe("derivative")
  })

  test("is original where the version word sits outside every bracket", () => {
    expect(deriveSongTypeFromTitle("Live and Let Die")).toBe("original")
  })

  test("is original where the bracket holds no version word", () => {
    expect(deriveSongTypeFromTitle("Killer Queen (feat. Someone)")).toBe("original")
  })
})

describe("performedWorkIds", () => {
  test("takes the work every performance recording points at", () => {
    const rel: MbRelation = {
      type: "performance",
      "target-type": "work",
      work: { id: "w1", title: "Song" },
    }
    expect([...performedWorkIds([recording("r1", "Song", [rel])])]).toEqual(["w1"])
  })

  test("takes no work from a relation that is no performance", () => {
    const rel: MbRelation = {
      type: "medley of",
      "target-type": "work",
      work: { id: "w1", title: "Song" },
    }
    expect(performedWorkIds([recording("r1", "Song", [rel])]).size).toBe(0)
  })
})

describe("dedupeRecordings", () => {
  test("keeps one recording per normalised title", () => {
    const held = dedupeRecordings([
      recording("r2", "Under Pressure"),
      recording("r1", "under  pressure!"),
    ])
    expect(held.length).toBe(1)
  })

  test("keeps the recording with the lowest MusicBrainz id", () => {
    const held = dedupeRecordings([
      recording("r2", "Under Pressure"),
      recording("r1", "Under Pressure"),
    ])
    expect(held[0]?.recordingId).toBe("r1")
  })

  test("keeps the title of the recording it kept", () => {
    const held = dedupeRecordings([
      recording("r2", "UNDER PRESSURE"),
      recording("r1", "Under Pressure"),
    ])
    expect(held[0]?.title).toBe("Under Pressure")
  })

  test("drops a recording with no title", () => {
    expect(dedupeRecordings([recording("r1", null), recording("r2", "   ")]).length).toBe(0)
  })

  test("drops a recording whose title normalises to nothing", () => {
    expect(dedupeRecordings([recording("r1", "???")]).length).toBe(0)
  })

  test("orders what it keeps by the normalised title", () => {
    const held = dedupeRecordings([
      recording("r1", "Zebra"),
      recording("r2", "Apple"),
      recording("r3", "Mango"),
    ])
    expect(held.map((r) => r.title)).toEqual(["Apple", "Mango", "Zebra"])
  })
})

describe("mbArtistToFields", () => {
  test("answers the fields an artist page carries", () => {
    expect(mbArtistToFields({ name: "Queen", genres: ["rock", "glam rock"] })).toEqual({
      title: "Queen",
      genre: ["rock", "glam rock"],
    })
  })

  test("names no provider, which the identity carries instead", () => {
    const fields = mbArtistToFields({ name: "Queen", genres: [] })
    expect("externalId" in fields).toBe(false)
    expect("source" in fields).toBe(false)
  })

  test("keeps the name MusicBrainz gave letter for letter", () => {
    expect(mbArtistToFields({ name: "Sigur Rós", genres: [] }).title).toBe("Sigur Rós")
  })

  test("keeps a name written in no Latin letter", () => {
    expect(mbArtistToFields({ name: "ヨルシカ", genres: [] }).title).toBe("ヨルシカ")
  })
})

describe("mbArtistIdentity", () => {
  test("answers the one record MusicBrainz holds of an artist", () => {
    expect(mbArtistIdentity({ mbid: QUEEN, today: "2026-09-02" })).toEqual({
      source: "musicbrainz",
      externalId: QUEEN,
      externalLink: "https://musicbrainz.org/artist/mbid-queen",
      lastSyncedAt: "2026-09-02",
    })
  })
})

describe("identityHeld", () => {
  const held = [
    { source: "spotify", externalId: "sp1" },
    { source: "musicbrainz", externalId: QUEEN },
  ]

  test("finds the MusicBrainz id among the records a page holds", () => {
    expect(identityHeld(held, QUEEN)).toBe(true)
  })

  test("answers false where another provider holds that id", () => {
    expect(identityHeld(held, "sp1")).toBe(false)
  })

  test("answers false where the page holds no record at all", () => {
    expect(identityHeld(undefined, QUEEN)).toBe(false)
  })
})

describe("mbWorkToSongFields", () => {
  test("answers the fields a song page carries", () => {
    expect(
      mbWorkToSongFields({
        work: work("w1", "Bohemian Rhapsody", [writerRel(QUEEN)]),
        artistSlug: "queen",
        artistMbid: QUEEN,
        performed: true,
        today: "2026-09-02",
      })
    ).toEqual({
      title: "Bohemian Rhapsody",
      artist: "artist/queen",
      externalIdentity: [
        {
          source: "musicbrainz",
          externalId: "w1",
          externalLink: "https://musicbrainz.org/work/w1",
          lastSyncedAt: "2026-09-02",
        },
      ],
      songType: "original",
      performed: true,
      written: "solo",
    })
  })

  test("the id read back off a work's song is the work's own", () => {
    const fields = mbWorkToSongFields({
      work: work("w1", "Bohemian Rhapsody", [writerRel(QUEEN)]),
      artistSlug: "queen",
      artistMbid: QUEEN,
      performed: true,
      today: "2026-09-02",
    })
    expect(songIdIn(fields)).toBe("w1")
  })

  test("takes the title from the work", () => {
    const fields = mbWorkToSongFields({
      work: work("w1", "Ég Anda", [writerRel(QUEEN)]),
      artistSlug: "queen",
      artistMbid: QUEEN,
      performed: true,
      today: "2026-09-02",
    })
    expect(fields.title).toBe("Ég Anda")
  })

  test("names neither a written field nor a song type where nothing names a writer", () => {
    const fields = mbWorkToSongFields({
      work: work("w1", "Someone Else's Song"),
      artistSlug: "queen",
      artistMbid: QUEEN,
      performed: false,
      today: "2026-09-02",
    })
    expect("written" in fields).toBe(false)
    expect("songType" in fields).toBe(false)
  })

  test("names a song type where the work is a version of another", () => {
    const fields = mbWorkToSongFields({
      work: work("w1", "Someone Else's Song", [versionRel("based on", "backward")]),
      artistSlug: "queen",
      artistMbid: QUEEN,
      performed: false,
      today: "2026-09-02",
    })
    expect(fields.songType).toBe("derivative")
  })
})

describe("mbRecordingToSongFields", () => {
  test("answers a performed song with the type its title says", () => {
    expect(
      mbRecordingToSongFields({
        title: "Under Pressure (Live)",
        recordingId: "r1",
        artistSlug: "queen",
        today: "2026-09-02",
      })
    ).toEqual({
      title: "Under Pressure (Live)",
      artist: "artist/queen",
      externalIdentity: [
        {
          source: "musicbrainz",
          externalId: "r1",
          externalLink: "https://musicbrainz.org/recording/r1",
          lastSyncedAt: "2026-09-02",
        },
      ],
      songType: "derivative",
      performed: true,
    })
  })

  test("a song holding no record of musicbrainz answers no id", () => {
    expect(
      songIdIn({ title: "Held", artist: "queen", songType: "original", performed: true })
    ).toBeNull()
  })

  test("keeps a title written in no Latin letter", () => {
    const fields = mbRecordingToSongFields({
      title: "夜に駆ける",
      recordingId: "r2",
      artistSlug: "yorushika",
      today: "2026-09-02",
    })
    expect(fields.title).toBe("夜に駆ける")
  })
})
