import { expect, test } from "bun:test"
import { minutes } from "akasha/alan/collection/unit/pages/minutes.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import { artist } from "akasha/alan/music/catalog/artist/artist.page-type.ts"
import { sylviaDaley } from "akasha/alan/music/catalog/artist/pages/sylvia-daley/sylvia-daley.artist.ts"
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
  creditFor,
  type Editing,
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

const ARTIST = "sylvia-daley"

const RELEASE = "sylvia-daley-pixie"

const DELUXE = "sylvia-daley-pixie-deluxe"

const ELF = "sylvia-daley-pixie-elf"

const ONE_SONG = [ELF_SONG]

const PAGED: ReadonlyMap<string, string> = new Map([["sp-artist", sylviaDaley.slug]])

const SYLVIA_AT = `${artist.slug}/${sylviaDaley.slug}` as const

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
    artists: PAGED,
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
  return {
    names: catalogueNamesFrom([]),
    held: new Map<string, Value>(),
    byRelease: new Map<string, number>(),
    byKey: new Map<string, string>(),
    artists: PAGED,
  }
}

type Wrote = { readonly pageTypeSlug: string; readonly slug: string; readonly values: Value }

function writingInto(wrote: Wrote[]): Editing {
  return (pageTypeSlug, slug, values) => {
    wrote.push({ pageTypeSlug, slug, values })
    return { at: ADDS, given: { at: slug, body: "" } }
  }
}

function syncing(
  tracks: Tracked,
  releaseSlug: string,
  ...items: readonly AlbumTrack[]
): readonly Wrote[] {
  const wrote: Wrote[] = []
  trackEdits({
    releaseSlug,
    artistSlug: ARTIST,
    filing: filingOf([]),
    album: album(...items),
    tracks,
    edit: writingInto(wrote),
  })
  return wrote.filter((one) => one.pageTypeSlug === "track")
}

test("a track arrives started by nobody and heard for none of its length", () => {
  const values = valuesFor(track("t7", "Elf", 90_000, 3))
  expect(values["title"]).toBe("Elf")
  expect(values["partOfCollections"]).toEqual(["release/sylvia-daley-pixie"])
  expect(values["ownLength"]).toBe(1.5)
  expect(values["unit"]).toBe(MINUTES)
  expect(values["status"]).toBe("not-started")
  expect(values["ownProgress"]).toBe(0)
  expect(values["type"]).toBe("track")
})

test("a track states whether the provider marks it explicit", () => {
  const values = valuesFor(track("t7", "Elf", 90_000, 3, 2))
  expect(values["discNumber"]).toBeUndefined()
  expect(values["explicit"]).toBe(false)
})

test("a track states every artist the provider credits, in the order given", () => {
  const one = track("t7", "Elf", 90_000, 3)
  const guest = { id: "sp-guest", name: "A Guest" }
  const values = valuesFor({ ...one, artists: [...one.artists, guest] })
  expect(values["trackArtist"]).toEqual([{ artist: SYLVIA_AT }, { artistName: "A Guest" }])
})

test("a credit names the artist page naming the provider's id for that artist", () => {
  expect(creditFor(PAGED, "sp-artist", "Sylvia Daley")).toEqual({ artist: SYLVIA_AT })
})

test("a credit whose artist has no page states the name the provider credits", () => {
  expect(creditFor(PAGED, "sp-guest", "A Guest")).toEqual({ artistName: "A Guest" })
  expect(creditFor(PAGED, null, "A Guest")).toEqual({ artistName: "A Guest" })
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

test("a track states the id Spotify gives it only on the carrier naming each release", () => {
  const values = valuesFor(track("t7", "Elf", 90_000, 3))
  expect(values["externalIdentity"]).toBeUndefined()
  expect(values["position"]).toBeUndefined()
})

test("the progress and the grade a person gave a track outlive the sweep", () => {
  const values = valuesFor(track("t7", "Elf", 90_000, 3), {
    status: "completed",
    ownProgress: 1.5,
    grade: "S",
  })
  expect(values["status"]).toBe("completed")
  expect(values["ownProgress"]).toBe(1.5)
  expect(values["grade"]).toBe("S")
})

function editsOf(filing: Filing, asked: string[], ...items: readonly AlbumTrack[]) {
  return trackEdits({
    releaseSlug: RELEASE,
    artistSlug: ARTIST,
    filing,
    album: album(...items),
    tracks: nothingFiled(),
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

test("a release's count of tracks filed is kept up within the run that filed them", () => {
  const tracks = nothingFiled()
  expect(tracks.byRelease.has(RELEASE)).toBe(false)
  trackEdits({
    releaseSlug: RELEASE,
    artistSlug: ARTIST,
    filing: filingOf([]),
    album: album(track("t0", "One", 60_000, 1), track("t1", "Two", 60_000, 2)),
    tracks,
    edit: (_pageTypeSlug, slug) => ({ at: ADDS, given: { at: slug, body: "" } }),
  })
  expect(tracks.byRelease.get(RELEASE)).toBe(2)
})

test("a track states the release carrying it and where on that release it sits", () => {
  expect(valuesFor(track("t7", "Elf", 90_000, 3))["carriedBy"]).toEqual([
    {
      release: "release/sylvia-daley-pixie",
      discNumber: 1,
      position: 3,
      externalId: "t7",
      externalLink: "https://open.spotify.com/track/t7",
    },
  ])
})

test("a recording a second release carries lands on the page the first release filed", () => {
  const tracks = nothingFiled()
  const here = syncing(tracks, RELEASE, track("t7", "Elf", 90_000, 3))
  const there = syncing(tracks, DELUXE, track("t9", "Elf", 90_000, 11, 2))
  expect(here[0]?.slug).toBe(ELF)
  expect(there[0]?.slug).toBe(ELF)
})

test("a track a second release carries names both releases carrying it", () => {
  const tracks = nothingFiled()
  syncing(tracks, RELEASE, track("t7", "Elf", 90_000, 3))
  const there = syncing(tracks, DELUXE, track("t9", "Elf", 90_000, 11, 2))
  expect(there[0]?.values["partOfCollections"]).toEqual([
    "release/sylvia-daley-pixie",
    "release/sylvia-daley-pixie-deluxe",
  ])
})

test("a track a second release carries states one carrier for each release", () => {
  const tracks = nothingFiled()
  syncing(tracks, RELEASE, track("t7", "Elf", 90_000, 3))
  const there = syncing(tracks, DELUXE, track("t9", "Elf", 90_000, 11, 2))
  expect(there[0]?.values["carriedBy"]).toEqual([
    {
      release: "release/sylvia-daley-pixie",
      discNumber: 1,
      position: 3,
      externalId: "t7",
      externalLink: "https://open.spotify.com/track/t7",
    },
    {
      release: "release/sylvia-daley-pixie-deluxe",
      discNumber: 2,
      position: 11,
      externalId: "t9",
      externalLink: "https://open.spotify.com/track/t9",
    },
  ])
})

test("a release synced again replaces the carrier naming that release", () => {
  const tracks = nothingFiled()
  syncing(tracks, RELEASE, track("t7", "Elf", 90_000, 3))
  const again = syncing(tracks, RELEASE, track("t7", "Elf", 90_000, 4))
  expect(again[0]?.values["carriedBy"]).toEqual([
    {
      release: "release/sylvia-daley-pixie",
      discNumber: 1,
      position: 4,
      externalId: "t7",
      externalLink: "https://open.spotify.com/track/t7",
    },
  ])
  expect(again[0]?.values["partOfCollections"]).toEqual(["release/sylvia-daley-pixie"])
})

test("another recording under the same title takes a page of its own", () => {
  const tracks = nothingFiled()
  syncing(tracks, RELEASE, track("t7", "Elf", 90_000, 3))
  const there = syncing(tracks, DELUXE, track("t9", "Elf", 91_000, 11))
  expect(there[0]?.slug).toBe("sylvia-daley-pixie-deluxe-elf")
})
