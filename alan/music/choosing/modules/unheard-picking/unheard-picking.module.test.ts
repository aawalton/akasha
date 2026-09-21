import { expect, test } from "bun:test"
import { artist } from "akasha/alan/music/catalog/artist/artist.page-type.ts"
import { release } from "akasha/alan/music/catalog/release/release.page-type.ts"
import { pickingOver } from "akasha/alan/music/choosing/modules/unheard-picking/unheard-picking.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const FOLLOWED = new Set(["one-singer", "two-singer"])

type Made = {
  readonly slug: string
  readonly releaseSlug: string
  readonly trackId?: string | null
  readonly status?: string
  readonly key?: string | null
  readonly disc?: number
  readonly position?: number
}

function releaseMade(slug: string, artistSlug: string, publishedAt?: string): Value {
  return {
    slug,
    partOfCollections: [`${artist.slug}/${artistSlug}`],
    ...(publishedAt === undefined ? {} : { publishedAt }),
  }
}

function carrierMade(made: Made, releaseSlug: string, trackId: string): Value {
  return {
    release: `${release.slug}/${releaseSlug}`,
    discNumber: made.disc ?? 1,
    position: made.position ?? 1,
    externalId: trackId,
  }
}

function trackMade(made: Made): Value {
  const id = made.trackId === undefined ? `spotify-${made.slug}` : made.trackId
  return {
    slug: made.slug,
    title: made.slug,
    status: made.status ?? "not-started",
    partOfCollections: [`${release.slug}/${made.releaseSlug}`],
    ...(made.key === undefined ? {} : made.key === null ? {} : { trackKey: made.key }),
    ...(id === null ? {} : { carriedBy: [carrierMade(made, made.releaseSlug, id)] }),
  }
}

const RELEASES = [
  releaseMade("one-first", "one-singer", "2020-03-01"),
  releaseMade("one-second", "one-singer", "2018-07-04"),
  releaseMade("one-undated", "one-singer"),
  releaseMade("two-first", "two-singer", "2021-11-11"),
  releaseMade("three-first", "three-singer", "2019-01-01"),
]

function slugsOf(tracks: readonly Value[]): readonly string[] {
  return pickingOver(tracks, RELEASES, FOLLOWED).map((one) => one.slug)
}

test("a track Alan has heard is never picked", () => {
  const tracks = [
    trackMade({ slug: "a", releaseSlug: "one-first", status: "completed" }),
    trackMade({ slug: "b", releaseSlug: "one-first" }),
  ]
  expect(slugsOf(tracks)).toEqual(["b"])
})

test("a track whose artist Alan does not follow is never picked", () => {
  const tracks = [
    trackMade({ slug: "a", releaseSlug: "three-first" }),
    trackMade({ slug: "b", releaseSlug: "one-first" }),
  ]
  expect(slugsOf(tracks)).toEqual(["b"])
})

test("a track no release or no spotify id names is never picked", () => {
  const tracks = [
    trackMade({ slug: "a", releaseSlug: "one-first", trackId: null }),
    trackMade({ slug: "b", releaseSlug: "nowhere" }),
    trackMade({ slug: "c", releaseSlug: "one-first" }),
  ]
  expect(slugsOf(tracks)).toEqual(["c"])
})

test("one track of a track key is picked, and it is the first in order", () => {
  const tracks = [
    trackMade({ slug: "later", releaseSlug: "one-first", key: "same" }),
    trackMade({ slug: "earlier", releaseSlug: "one-second", key: "same" }),
  ]
  expect(slugsOf(tracks)).toEqual(["earlier"])
})

test("a track stating no track key is never folded into a key", () => {
  const tracks = [
    trackMade({ slug: "a", releaseSlug: "one-first", key: null }),
    trackMade({ slug: "b", releaseSlug: "one-first", key: null, position: 2 }),
  ]
  expect(slugsOf(tracks)).toEqual(["a", "b"])
})

test("tracks of one artist are ordered by the day their release came out", () => {
  const tracks = [
    trackMade({ slug: "newer", releaseSlug: "one-first" }),
    trackMade({ slug: "older", releaseSlug: "one-second" }),
  ]
  expect(slugsOf(tracks)).toEqual(["older", "newer"])
})

test("tracks that came out on one day keep the order their release carries them in", () => {
  const tracks = [
    trackMade({ slug: "c", releaseSlug: "one-first", disc: 2, position: 1 }),
    trackMade({ slug: "b", releaseSlug: "one-first", disc: 1, position: 2 }),
    trackMade({ slug: "a", releaseSlug: "one-first", disc: 1, position: 1 }),
  ]
  expect(slugsOf(tracks)).toEqual(["a", "b", "c"])
})

test("a track two releases carry is picked under the release that came out first", () => {
  const both = {
    slug: "both",
    title: "both",
    status: "not-started",
    trackKey: "same",
    carriedBy: [
      { release: `${release.slug}/one-first`, discNumber: 1, position: 9, externalId: "later" },
      { release: `${release.slug}/one-second`, discNumber: 1, position: 2, externalId: "earlier" },
    ],
  }
  const picked = pickingOver(
    [both, trackMade({ slug: "other", releaseSlug: "one-second" })],
    RELEASES,
    FOLLOWED
  )
  expect(picked.map((one) => one.slug)).toEqual(["other", "both"])
  expect(picked.map((one) => one.trackId)).toEqual(["spotify-other", "earlier"])
  expect(picked.map((one) => one.releaseSlug)).toEqual(["one-second", "one-second"])
})

test("a track two releases carry and no key names is picked once", () => {
  const twice = {
    slug: "twice",
    title: "twice",
    status: "not-started",
    carriedBy: [
      { release: `${release.slug}/one-first`, discNumber: 1, position: 1, externalId: "later" },
      { release: `${release.slug}/one-second`, discNumber: 1, position: 1, externalId: "earlier" },
    ],
  }
  expect(slugsOf([twice])).toEqual(["twice"])
})

test("a track whose release states no day comes after every track whose release states one", () => {
  const tracks = [
    trackMade({ slug: "undated", releaseSlug: "one-undated" }),
    trackMade({ slug: "newer", releaseSlug: "one-first" }),
    trackMade({ slug: "older", releaseSlug: "one-second" }),
  ]
  expect(slugsOf(tracks)).toEqual(["older", "newer", "undated"])
})

test("an artist's tracks run together, and artists run in the order of their slugs", () => {
  const tracks = [
    trackMade({ slug: "two-a", releaseSlug: "two-first", position: 1 }),
    trackMade({ slug: "one-a", releaseSlug: "one-first", position: 1 }),
    trackMade({ slug: "one-b", releaseSlug: "one-first", position: 2 }),
    trackMade({ slug: "one-c", releaseSlug: "one-first", position: 3 }),
  ]
  expect(slugsOf(tracks)).toEqual(["one-a", "one-b", "one-c", "two-a"])
})
