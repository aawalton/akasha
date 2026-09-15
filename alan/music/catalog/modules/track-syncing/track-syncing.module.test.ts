import { expect, test } from "bun:test"
import { catalogueNamesFrom } from "akasha/alan/music/catalog/modules/catalogue-slug/catalogue-slug.module.code.ts"
import {
  type Tracked,
  trackEdits,
  trackKeyFor,
  trackValues,
} from "akasha/alan/music/catalog/modules/track-syncing/track-syncing.module.code.ts"
import type { AlbumTrack } from "akasha/alan/music/spotify/modules/releases/spotify-releases.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const TODAY = "2026-09-15"

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

function nothingFiled(): Tracked {
  return { names: catalogueNamesFrom([]), held: new Map<string, Value>(), byRelease: new Set() }
}

test("a track arrives started by nobody and heard for none of its length", () => {
  const values = trackValues({
    releaseSlug: "sylvia-daley-pixie",
    slug: "sylvia-daley-pixie-elf",
    track: track("t7", "Elf", 90_000, 3),
    was: {},
    today: TODAY,
  })
  expect(values["title"]).toBe("Elf")
  expect(values["partOfCollections"]).toEqual(["release/sylvia-daley-pixie"])
  expect(values["position"]).toBe(3)
  expect(values["ownLength"]).toBe(1.5)
  expect(values["unit"]).toBe("unit/minutes")
  expect(values["status"]).toBe("not-started")
  expect(values["ownProgress"]).toBe(0)
  expect(values["type"]).toBe("track")
})

test("a track states the disc it sits on and whether it is explicit", () => {
  const values = trackValues({
    releaseSlug: "sylvia-daley-pixie",
    slug: "sylvia-daley-pixie-elf",
    track: track("t7", "Elf", 90_000, 3, 2),
    was: {},
    today: TODAY,
  })
  expect(values["discNumber"]).toBe(2)
  expect(values["explicit"]).toBe(false)
})

test("a track states every artist the provider credits, in the order given", () => {
  const one = track("t7", "Elf", 90_000, 3)
  const values = trackValues({
    releaseSlug: "sylvia-daley-pixie",
    slug: "sylvia-daley-pixie-elf",
    track: { ...one, artists: [...one.artists, { id: "sp-guest", name: "A Guest" }] },
    was: {},
    today: TODAY,
  })
  expect(values["trackArtist"]).toEqual([
    { externalId: "sp-artist", artistName: "Sylvia Daley" },
    { externalId: "sp-guest", artistName: "A Guest" },
  ])
})

test("a track states the key matching it to the same track on another release", () => {
  const values = trackValues({
    releaseSlug: "sylvia-daley-pixie",
    slug: "sylvia-daley-pixie-elf",
    track: track("t7", "Elf", 90_000, 3),
    was: {},
    today: TODAY,
  })
  expect(values["trackKey"]).toBe("elf|sp-artist|90000")
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

test("a track names the one provider it was read from, stamped with the day it was read", () => {
  const values = trackValues({
    releaseSlug: "sylvia-daley-pixie",
    slug: "sylvia-daley-pixie-elf",
    track: track("t7", "Elf", 90_000, 3),
    was: {},
    today: TODAY,
  })
  expect(values["externalIdentity"]).toEqual([
    {
      source: "spotify",
      externalId: "t7",
      externalLink: "https://open.spotify.com/track/t7",
      lastSyncedAt: TODAY,
    },
  ])
})

test("the progress and the grade a person gave a track outlive the sweep", () => {
  const values = trackValues({
    releaseSlug: "sylvia-daley-pixie",
    slug: "sylvia-daley-pixie-elf",
    track: track("t7", "Elf", 90_000, 3),
    was: { status: "completed", ownProgress: 1.5, rank: "S" },
    today: TODAY,
  })
  expect(values["status"]).toBe("completed")
  expect(values["ownProgress"]).toBe(1.5)
  expect(values["rank"]).toBe("S")
})

test("every track a release carries is composed as an edit of its own", () => {
  const tracks = nothingFiled()
  const asked: string[] = []
  const edits = trackEdits({
    releaseSlug: "sylvia-daley-pixie",
    album: {
      id: "a1",
      name: "Pixie",
      album_type: "album",
      release_date: "2026-02-27",
      release_date_precision: "day",
      total_tracks: 2,
      external_urls: { spotify: "https://open.spotify.com/album/a1" },
      tracks: { items: [track("t0", "One", 60_000, 1), track("t1", "Two", 60_000, 2)] },
    },
    tracks,
    today: TODAY,
    edit: (pageTypeSlug, slug) => {
      asked.push(`${pageTypeSlug}/${slug}`)
      return { at: "change-mechanical/add-file-of-any-kind", given: { at: slug, body: "" } }
    },
  })
  expect(edits).toHaveLength(2)
  expect(asked).toEqual(["track/sylvia-daley-pixie-one", "track/sylvia-daley-pixie-two"])
})

test("a release whose tracks are filed is marked so within the run that filed them", () => {
  const tracks = nothingFiled()
  expect(tracks.byRelease.has("sylvia-daley-pixie")).toBe(false)
  trackEdits({
    releaseSlug: "sylvia-daley-pixie",
    album: {
      id: "a1",
      name: "Pixie",
      album_type: "album",
      release_date: "2026-02-27",
      release_date_precision: "day",
      total_tracks: 1,
      external_urls: { spotify: "https://open.spotify.com/album/a1" },
      tracks: { items: [track("t0", "One", 60_000, 1)] },
    },
    tracks,
    today: TODAY,
    edit: (_pageTypeSlug, slug) => ({
      at: "change-mechanical/add-file-of-any-kind",
      given: { at: slug, body: "" },
    }),
  })
  expect(tracks.byRelease.has("sylvia-daley-pixie")).toBe(true)
})
