import { expect, test } from "bun:test"
import { minutes } from "akasha/alan/collection/unit/pages/minutes.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import { catalogueNamesFrom } from "akasha/alan/music/catalog/modules/catalogue-slug/catalogue-slug.module.code.ts"
import {
  type Filing,
  songForTrack,
} from "akasha/alan/music/catalog/modules/song-filing/song-filing.module.code.ts"
import {
  ELF as ELF_SONG,
  filingOf,
} from "akasha/alan/music/catalog/modules/song-filing/song-filing.module.test-fixtures.ts"
import {
  type Tracked,
  trackEdits,
  trackKeyFor,
  trackValues,
} from "akasha/alan/music/catalog/modules/track-syncing/track-syncing.module.code.ts"
import type {
  AlbumTrack,
  AlbumWithTracks,
} from "akasha/alan/music/spotify/modules/releases/spotify-releases.module.code.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ADDS = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const MINUTES = `${unit.slug}/${minutes.slug}` as const

const TODAY = "2026-09-15"

const ARTIST = "sylvia-daley"

const RELEASE = "sylvia-daley-pixie"

const ELF = "sylvia-daley-pixie-elf"

const ONE_SONG = [ELF_SONG]

function track(id: string, name: string, at: number, nth: number, disc = 1): AlbumTrack {
  return {
    id,
    name,
    duration_ms: at,
    track_number: nth,
    disc_number: disc,
    explicit: false,
    artists: [{ id: "sp-artist", name: "Sylvia Daley" }],
    external_urls: { spotify: `https://open.spotify.com/track/${id}` },
  }
}

function valuesFor(
  one: AlbumTrack,
  was: Value = {},
  songs: readonly (readonly [string, string])[] = []
): Value {
  const said = songForTrack(filingOf([...songs]), ARTIST, one.name)
  return trackValues({
    releaseSlug: RELEASE,
    song: said === null ? null : said.slug,
    slug: ELF,
    track: one,
    was,
    today: TODAY,
  })
}

function album(...items: readonly AlbumTrack[]): AlbumWithTracks {
  return {
    id: "a1",
    name: "Pixie",
    album_type: "album",
    release_date: "2026-02-27",
    release_date_precision: "day",
    total_tracks: items.length,
    external_urls: { spotify: "https://open.spotify.com/album/a1" },
    tracks: { items: [...items] },
  }
}

function nothingFiled(): Tracked {
  return { names: catalogueNamesFrom([]), held: new Map<string, Value>(), byRelease: new Set() }
}

test("a track arrives started by nobody and heard for none of its length", () => {
  const values = valuesFor(track("t7", "Elf", 90_000, 3))
  expect(values["title"]).toBe("Elf")
  expect(values["partOfCollections"]).toEqual(["release/sylvia-daley-pixie"])
  expect(values["position"]).toBe(3)
  expect(values["ownLength"]).toBe(1.5)
  expect(values["unit"]).toBe(MINUTES)
  expect(values["status"]).toBe("not-started")
  expect(values["ownProgress"]).toBe(0)
  expect(values["type"]).toBe("track")
})

test("a track states the disc it sits on and whether it is explicit", () => {
  const values = valuesFor(track("t7", "Elf", 90_000, 3, 2))
  expect(values["discNumber"]).toBe(2)
  expect(values["explicit"]).toBe(false)
})

test("a track states every artist the provider credits, in the order given", () => {
  const one = track("t7", "Elf", 90_000, 3)
  const guest = { id: "sp-guest", name: "A Guest" }
  const values = valuesFor({ ...one, artists: [...one.artists, guest] })
  expect(values["trackArtist"]).toEqual([
    { externalId: "sp-artist", artistName: "Sylvia Daley" },
    { externalId: "sp-guest", artistName: "A Guest" },
  ])
})

test("a track states the key matching it to the same track on another release", () => {
  expect(valuesFor(track("t7", "Elf", 90_000, 3))["trackKey"]).toBe("elf|sp-artist|90000")
})

test("one recording carried on two releases has one track key", () => {
  const here = track("t7", "Elf", 90_000, 3)
  const there = track("t9", "Elf", 90_000, 11, 2)
  expect(trackKeyFor(there)).toBe(trackKeyFor(here))
})

test("a track of another length has another track key", () => {
  const here = track("t7", "Elf", 90_000, 3)
  const there = track("t9", "Elf", 90_001, 3)
  expect(trackKeyFor(there)).not.toBe(trackKeyFor(here))
})

test("a track key drops the case, the marks and everything not a letter or a digit", () => {
  expect(trackKeyFor(track("t7", "Élan Vital (Live!)", 90_000, 3))).toBe(
    "elanvitallive|sp-artist|90000"
  )
})

test("a track key names the artists in one order however the provider gives them", () => {
  const one = track("t7", "Elf", 90_000, 3)
  const guest = { id: "sp-guest", name: "A Guest" }
  const here = { ...one, artists: [...one.artists, guest] }
  const there = { ...one, artists: [guest, ...one.artists] }
  expect(trackKeyFor(there)).toBe(trackKeyFor(here))
  expect(trackKeyFor(here)).toBe("elf|sp-artist,sp-guest|90000")
})

test("a track names the song that track is a recording of", () => {
  expect(valuesFor(track("t7", "Elf", 90_000, 3), {}, ONE_SONG)["song"]).toBe(
    "song/sylvia-daley-elf"
  )
})

test("a live take names the song that take is a recording of", () => {
  expect(valuesFor(track("t7", "Elf - Live", 90_000, 3), {}, ONE_SONG)["song"]).toBe(
    "song/sylvia-daley-elf"
  )
})

test("a track whose song is filed nowhere has that song filed and names it", () => {
  expect(valuesFor(track("t7", "Elf", 90_000, 3))["song"]).toBe("song/sylvia-daley-elf")
})

test("a track under an artist who has no page names no song", () => {
  const strangers: Filing = { songs: new Map(), taken: new Set(), artists: new Set() }
  const one = track("t7", "Elf", 90_000, 3)
  expect(songForTrack(strangers, ARTIST, one.name)).toBeNull()
})

test("a track names the one provider it was read from, stamped with the day it was read", () => {
  expect(valuesFor(track("t7", "Elf", 90_000, 3))["externalIdentity"]).toEqual([
    {
      source: "spotify",
      externalId: "t7",
      externalLink: "https://open.spotify.com/track/t7",
      lastSyncedAt: TODAY,
    },
  ])
})

test("the progress and the grade a person gave a track outlive the sweep", () => {
  const values = valuesFor(track("t7", "Elf", 90_000, 3), {
    status: "completed",
    ownProgress: 1.5,
    rank: "S",
  })
  expect(values["status"]).toBe("completed")
  expect(values["ownProgress"]).toBe(1.5)
  expect(values["rank"]).toBe("S")
})

function editsOf(filing: Filing, asked: string[], ...items: readonly AlbumTrack[]) {
  return trackEdits({
    releaseSlug: RELEASE,
    artistSlug: ARTIST,
    filing,
    album: album(...items),
    tracks: nothingFiled(),
    today: TODAY,
    edit: (pageTypeSlug, slug) => {
      asked.push(`${pageTypeSlug}/${slug}`)
      return { at: ADDS, given: { at: slug, body: "" } }
    },
  })
}

test("every track a release carries is composed as an edit of its own", () => {
  const asked: string[] = []
  const filing = filingOf([])
  songForTrack(filing, ARTIST, "One")
  songForTrack(filing, ARTIST, "Two")
  const edits = editsOf(filing, asked, track("t0", "One", 60_000, 1), track("t1", "Two", 60_000, 2))
  expect(edits.tracked).toBe(2)
  expect(edits.filed).toBe(0)
  expect(asked).toEqual(["track/sylvia-daley-pixie-one", "track/sylvia-daley-pixie-two"])
})

test("a song a swept track needs and nothing has filed is filed beside that track", () => {
  const asked: string[] = []
  const edits = editsOf(filingOf([]), asked, track("t0", "One", 60_000, 1))
  expect(edits.filed).toBe(1)
  expect(edits.tracked).toBe(1)
  expect(asked).toEqual(["song/sylvia-daley-one", "track/sylvia-daley-pixie-one"])
})

test("two takes of one composition are filed as one song", () => {
  const asked: string[] = []
  const edits = editsOf(
    filingOf([]),
    asked,
    track("t0", "One", 60_000, 1),
    track("t1", "One - Live", 60_000, 2)
  )
  expect(edits.filed).toBe(1)
  expect(edits.tracked).toBe(2)
})

test("a release whose tracks are filed is marked so within the run that filed them", () => {
  const tracks = nothingFiled()
  expect(tracks.byRelease.has(RELEASE)).toBe(false)
  trackEdits({
    releaseSlug: RELEASE,
    artistSlug: ARTIST,
    filing: filingOf([]),
    album: album(track("t0", "One", 60_000, 1)),
    tracks,
    today: TODAY,
    edit: (_pageTypeSlug, slug) => ({ at: ADDS, given: { at: slug, body: "" } }),
  })
  expect(tracks.byRelease.has(RELEASE)).toBe(true)
})
