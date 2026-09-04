import { describe, expect, test } from "bun:test"
import type {
  MbArtist,
  MbArtistSearchHit,
  MbRecording,
  MbRelation,
  MbWork,
} from "../musicbrainz-schema/musicbrainz-schema.module.code.ts"
import {
  dedupeRecordings,
  deriveSongType,
  deriveSongTypeFromTitle,
  deriveWritten,
  extractGenres,
  isSongWork,
  mbArtistToFields,
  mbRecordingToSongFields,
  mbWorkToSongFields,
  performedWorkIds,
  pickBestArtist,
} from "./musicbrainz-map.module.code.ts"

const QUEEN = "mbid-queen"
const BOWIE = "mbid-bowie"

function hit(name: string, score: number, id = `mbid-${name}`): MbArtistSearchHit {
  return { id, name, score }
}

function writerRel(artistId: string, type = "writer"): MbRelation {
  return { type, "target-type": "artist", artist: { id: artistId, name: artistId } }
}

function versionRel(type: string, direction: string): MbRelation {
  return {
    type,
    direction,
    "target-type": "work",
    work: { id: "mbid-other-work", title: "Other Work" },
  }
}

function work(id: string, title: string, relations: MbRelation[] = []): MbWork {
  return { id, title, relations }
}

function recording(id: string, title: string | null, relations: MbRelation[] = []): MbRecording {
  return { id, title, relations }
}

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
  test("is derivative where the artist wrote none of it", () => {
    expect(deriveSongType(work("w1", "Song"), null)).toBe("derivative")
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
    expect(
      mbArtistToFields({
        mbid: QUEEN,
        name: "Queen",
        genres: ["rock", "glam rock"],
        today: "2026-09-02",
      })
    ).toEqual({
      title: "Queen",
      externalId: QUEEN,
      externalLink: "https://musicbrainz.org/artist/mbid-queen",
      source: "musicbrainz",
      genre: ["rock", "glam rock"],
      lastSyncedAt: "2026-09-02",
    })
  })

  test("keeps the name MusicBrainz gave letter for letter", () => {
    const fields = mbArtistToFields({
      mbid: "mbid-sigur-ros",
      name: "Sigur Rós",
      genres: [],
      today: "2026-09-02",
    })
    expect(fields.title).toBe("Sigur Rós")
  })

  test("keeps a name written in no Latin letter", () => {
    const fields = mbArtistToFields({
      mbid: "mbid-yorushika",
      name: "ヨルシカ",
      genres: [],
      today: "2026-09-02",
    })
    expect(fields.title).toBe("ヨルシカ")
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
      artistSlug: "queen",
      externalId: "w1",
      externalLink: "https://musicbrainz.org/work/w1",
      source: "musicbrainz",
      lastSyncedAt: "2026-09-02",
      songType: "original",
      performed: true,
      written: "solo",
    })
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

  test("names no written field where the artist wrote none of it", () => {
    const fields = mbWorkToSongFields({
      work: work("w1", "Someone Else's Song"),
      artistSlug: "queen",
      artistMbid: QUEEN,
      performed: false,
      today: "2026-09-02",
    })
    expect("written" in fields).toBe(false)
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
      artistSlug: "queen",
      externalId: "r1",
      externalLink: "https://musicbrainz.org/recording/r1",
      source: "musicbrainz",
      lastSyncedAt: "2026-09-02",
      songType: "derivative",
      performed: true,
    })
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
