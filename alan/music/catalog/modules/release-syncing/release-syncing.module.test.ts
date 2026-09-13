import { expect, test } from "bun:test"
import { catalogueNamesFrom } from "akasha/alan/music/catalog/modules/catalogue-slug/catalogue-slug.module.code.ts"
import {
  artistValues,
  type Filed,
  publishedDayOf,
  releaseValues,
  taken,
  unfiledIn,
} from "akasha/alan/music/catalog/modules/release-syncing/release-syncing.module.code.ts"
import type {
  Album,
  AlbumWithTracks,
} from "akasha/alan/music/spotify/modules/releases/spotify-releases.module.code.ts"
import type { Value } from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"

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
    tracks: { items: ms.map((at, nth) => ({ id: `t${nth}`, name: `T${nth}`, duration_ms: at })) },
  }
}

function filedWith(rows: readonly { slug: string; was: Value }[]): Filed {
  const held = new Map<string, Value>()
  const named: { slug: string; externalId: string | null }[] = []
  for (const row of rows) {
    held.set(row.slug, row.was)
    const stated = row.was["externalIdentity"]
    const first = Array.isArray(stated) ? (stated[0] as { externalId?: string }) : undefined
    named.push({ slug: row.slug, externalId: first?.externalId ?? null })
  }
  return { names: catalogueNamesFrom(named), held }
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
  expect(values["unit"]).toBe("minutes")
  expect(values["partOfCollections"]).toEqual(["sylvia-daley"])
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
  expect(taken([])).toEqual({ only: null, limit: null, dryRun: false })
  expect(taken(["--only", "aurora", "--limit", "5", "--dry-run"])).toEqual({
    only: "aurora",
    limit: 5,
    dryRun: true,
  })
})

test("a limit that is no whole number of one or more is read as no limit", () => {
  expect(taken(["--limit", "0"]).limit).toBeNull()
  expect(taken(["--limit", "half"]).limit).toBeNull()
})
