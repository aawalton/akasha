import { expect, test } from "bun:test"
import { minutes } from "akasha/alan/collection/unit/pages/minutes.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import { artist } from "akasha/alan/music/catalog/artist/artist.page-type.ts"
import { sylviaDaley } from "akasha/alan/music/catalog/artist/pages/sylvia-daley/sylvia-daley.artist.ts"
import { catalogueNamesFrom } from "akasha/alan/music/catalog/modules/catalogue-slug/catalogue-slug.module.code.ts"
import {
  artistIn,
  artistValues,
  dueIn,
  type Filed,
  type Followed,
  publishedDayOf,
  releaseValues,
  shareOf,
  sweepingIn,
  taken,
  titleKey,
  unfiledIn,
} from "akasha/alan/music/catalog/modules/release-syncing/release-syncing.module.code.ts"
import type {
  Album,
  AlbumWithTracks,
} from "akasha/alan/music/spotify/modules/releases/spotify-releases.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const MINUTES = `${unit.slug}/${minutes.slug}` as const

const SYLVIA_AT = `${artist.slug}/${sylviaDaley.slug}` as const

const TODAY = "2026-09-13"

function album(id: string, name: string, day = "2026-02-27", precision = "day"): Album {
  return {
    id,
    name,
    album_type: "album",
    release_date: day,
    release_date_precision: precision,
    total_tracks: 2,
    external_urls: { spotify: `https://open.spotify.com/album/${id}` },
  }
}

function whole(one: Album, ms: readonly number[]): AlbumWithTracks {
  return {
    ...one,
    tracks: {
      items: ms.map((at, nth) => ({
        id: `t${nth}`,
        name: `T${nth}`,
        duration_ms: at,
        track_number: nth + 1,
        disc_number: 1,
        explicit: false,
        artists: [{ id: "sp-artist", name: "An Artist" }],
        external_urls: { spotify: `https://open.spotify.com/track/t${nth}` },
      })),
    },
  }
}

function filedWith(rows: readonly { slug: string; was: Value }[]): Filed {
  const held = new Map<string, Value>()
  const byTitle = new Map<string, string>()
  const named: { slug: string; externalId: string | null }[] = []
  for (const row of rows) {
    held.set(row.slug, row.was)
    const stated = row.was["externalIdentity"]
    const first = Array.isArray(stated) ? (stated[0] as { externalId?: string }) : undefined
    named.push({ slug: row.slug, externalId: first?.externalId ?? null })
    const artistSlug = artistIn(row.was)
    const title = row.was["title"]
    if (typeof title !== "string" || artistSlug === null) continue
    byTitle.set(titleKey(artistSlug, title), row.slug)
  }
  return { names: catalogueNamesFrom(named), held, byTitle }
}

test("a sweep over nothing filed asks for every album", () => {
  const found = unfiledIn(filedWith([]), "sylvia-daley", [album("a1", "Pixie")], null)
  expect(found.asked.map((one) => one.slug)).toEqual(["sylvia-daley-pixie"])
  expect(found.skipped).toBe(0)
})

test("a release already filed under its Spotify id is counted and not asked for again", () => {
  const filed = filedWith([
    {
      slug: "sylvia-daley-pixie",
      was: {
        slug: "sylvia-daley-pixie",
        externalIdentity: [{ source: "spotify", externalId: "a1" }],
      },
    },
  ])
  const found = unfiledIn(filed, "sylvia-daley", [album("a1", "Pixie")], null)
  expect(found.asked).toHaveLength(0)
  expect(found.skipped).toBe(1)
})

test("a release already filed is handed back so its tracks can be backfilled", () => {
  const filed = filedWith([
    {
      slug: "sylvia-daley-pixie",
      was: {
        slug: "sylvia-daley-pixie",
        externalIdentity: [{ source: "spotify", externalId: "a1" }],
      },
    },
  ])
  const found = unfiledIn(filed, "sylvia-daley", [album("a1", "Pixie")], null)
  expect(found.settled.map((one) => one.slug)).toEqual(["sylvia-daley-pixie"])
  expect(found.settled[0]?.album.id).toBe("a1")
})

test("a release nothing is filed under is asked for rather than backfilled", () => {
  const found = unfiledIn(filedWith([]), "sylvia-daley", [album("a1", "Pixie")], null)
  expect(found.settled).toHaveLength(0)
  expect(found.asked).toHaveLength(1)
})

test("a limit caps how many unfiled releases one artist gives up", () => {
  const albums = [album("a1", "One"), album("a2", "Two"), album("a3", "Three")]
  expect(unfiledIn(filedWith([]), "an-artist", albums, 2).asked).toHaveLength(2)
})

test("a release arrives started by nobody and heard for none of its length", () => {
  const values = releaseValues({
    artistSlug: "sylvia-daley",
    slug: "sylvia-daley-pixie",
    album: whole(album("a1", "Pixie"), [90_000, 30_000]),
    was: {},
    today: TODAY,
  })
  expect(values["status"]).toBe("not-started")
  expect(values["ownProgress"]).toBe(0)
  expect(values["ownLength"]).toBe(2)
  expect(values["unit"]).toBe(MINUTES)
  expect(values["partOfCollections"]).toEqual([SYLVIA_AT])
  expect(values["publishedAt"]).toBe("2026-02-27")
})

test("the progress and the grade a person gave a release outlive the sweep", () => {
  const values = releaseValues({
    artistSlug: "sylvia-daley",
    slug: "sylvia-daley-pixie",
    album: whole(album("a1", "Pixie"), [60_000]),
    was: { status: "completed", ownProgress: 3.5, rank: "A" },
    today: TODAY,
  })
  expect(values["status"]).toBe("completed")
  expect(values["ownProgress"]).toBe(3.5)
  expect(values["rank"]).toBe("A")
})

test("a release states the day only where Spotify gives a whole day", () => {
  expect(publishedDayOf(album("a1", "Pixie", "2026", "year"))).toBeNull()
  expect(publishedDayOf(album("a1", "Pixie", "2026-02", "month"))).toBeNull()
  expect(publishedDayOf(album("a1", "Pixie"))).toBe("2026-02-27")
  const values = releaseValues({
    artistSlug: "an-artist",
    slug: "an-artist-pixie",
    album: whole(album("a1", "Pixie", "2026", "year"), [60_000]),
    was: {},
    today: TODAY,
  })
  expect("publishedAt" in values).toBe(false)
})

test("a release names the one provider it was read from, stamped with the day it was read", () => {
  const values = releaseValues({
    artistSlug: "an-artist",
    slug: "an-artist-pixie",
    album: whole(album("a1", "Pixie"), [60_000]),
    was: {},
    today: TODAY,
  })
  expect(values["externalIdentity"]).toEqual([
    {
      source: "spotify",
      externalId: "a1",
      externalLink: "https://open.spotify.com/album/a1",
      lastSyncedAt: TODAY,
    },
  ])
})

test("an artist's own record is stamped and every other provider's is left alone", () => {
  const values = artistValues(
    {
      slug: "sylvia-daley",
      title: "Sylvia Daley",
      artistId: "sp-artist",
      was: {
        slug: "sylvia-daley",
        externalIdentity: [
          { source: "musicbrainz", externalId: "mb1" },
          { source: "spotify", externalId: "sp-artist", lastSyncedAt: "2026-02-17" },
        ],
      },
    },
    TODAY
  )
  expect(values["externalIdentity"]).toEqual([
    { source: "musicbrainz", externalId: "mb1" },
    {
      source: "spotify",
      externalId: "sp-artist",
      externalLink: "https://open.spotify.com/artist/sp-artist",
      lastSyncedAt: TODAY,
    },
  ])
})

test("the flags a run is given are read off what it was handed", () => {
  expect(taken([])).toEqual({ only: null, limit: null })
  expect(taken(["--only", "aurora", "--limit", "5"])).toEqual({ only: "aurora", limit: 5 })
})

test("a limit that is no whole number of one or more is read as no limit", () => {
  expect(taken(["--limit", "0"]).limit).toBeNull()
  expect(taken(["--limit", "half"]).limit).toBeNull()
})

test("a release Spotify gives a new id is the release already filed under its title", () => {
  const filed = filedWith([
    {
      slug: "sylvia-daley-secure",
      was: {
        slug: "sylvia-daley-secure",
        title: "Secure",
        partOfCollections: [SYLVIA_AT],
        ownProgress: 3,
        status: "completed",
        externalIdentity: [{ source: "spotify", externalId: "an-older-id" }],
      },
    },
  ])
  const found = unfiledIn(filed, "sylvia-daley", [album("a-newer-id", "Secure")], null)
  expect(found.asked).toHaveLength(1)
  expect(found.asked[0]?.slug).toBe("sylvia-daley-secure")
  expect(found.asked[0]?.was["ownProgress"]).toBe(3)
  expect(found.skipped).toBe(0)
})

test("a release of another artist under the same title is filed on its own", () => {
  const filed = filedWith([
    {
      slug: "sylvia-daley-secure",
      was: {
        slug: "sylvia-daley-secure",
        title: "Secure",
        partOfCollections: ["sylvia-daley"],
        externalIdentity: [{ source: "spotify", externalId: "an-older-id" }],
      },
    },
  ])
  const found = unfiledIn(filed, "another-artist", [album("a-newer-id", "Secure")], null)
  expect(found.asked[0]?.slug).toBe("another-artist-secure")
})

test("an artist and a title together name one filed release", () => {
  expect(titleKey("sylvia-daley", "Rubik's Cube")).toBe("sylvia-daley|rubiks-cube")
})

test("a release names its artist the same whether or not the page type is written", () => {
  expect(artistIn({ partOfCollections: [SYLVIA_AT] })).toBe(sylviaDaley.slug)
  expect(artistIn({ partOfCollections: [sylviaDaley.slug] })).toBe(sylviaDaley.slug)
  expect(artistIn({})).toBeNull()
})

function followed(slug: string, at: string | null): Followed {
  return {
    slug,
    title: slug,
    artistId: `sp-${slug}`,
    was: {
      slug,
      externalIdentity:
        at === null ? [] : [{ source: "spotify", externalId: `sp-${slug}`, lastSyncedAt: at }],
    },
  }
}

const SINCE = "2026-08-14"

test("an artist swept inside the last thirty days is not due", () => {
  expect(dueIn([followed("aurora", "2026-09-01")], SINCE)).toHaveLength(0)
})

test("an artist swept longer ago than that is due", () => {
  expect(dueIn([followed("aurora", "2026-07-01")], SINCE).map((one) => one.slug)).toEqual([
    "aurora",
  ])
})

test("an artist no sweep has stamped is due before any artist a sweep has stamped", () => {
  const every = [followed("aurora", "2026-07-01"), followed("emei", null)]
  expect(dueIn(every, SINCE).map((one) => one.slug)).toEqual(["emei", "aurora"])
})

test("the artist swept longest ago is the artist swept first", () => {
  const every = [followed("aurora", "2026-07-01"), followed("emei", "2026-01-01")]
  expect(dueIn(every, SINCE).map((one) => one.slug)).toEqual(["emei", "aurora"])
})

test("one run takes a thirtieth of the artists followed, and at least one of them", () => {
  expect(shareOf(42)).toBe(2)
  expect(shareOf(30)).toBe(1)
  expect(shareOf(1)).toBe(1)
  expect(shareOf(0)).toBe(1)
  expect(shareOf(60)).toBe(2)
  expect(shareOf(61)).toBe(3)
})

test("a run takes only its share of the artists due", () => {
  const every = [
    followed("aurora", "2026-01-01"),
    followed("emei", "2026-01-02"),
    followed("enya", "2026-01-03"),
  ]
  const taking = sweepingIn(every, { only: null, limit: null }, SINCE)
  expect(taking.map((one) => one.slug)).toEqual(["aurora"])
})

test("an artist named outright is swept whether or not that artist is due", () => {
  const every = [followed("aurora", "2026-09-01"), followed("emei", "2026-01-01")]
  const taking = sweepingIn(every, { only: "aurora", limit: null }, SINCE)
  expect(taking.map((one) => one.slug)).toEqual(["aurora"])
})
