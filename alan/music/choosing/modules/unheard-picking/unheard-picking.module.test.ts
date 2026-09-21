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

function releaseMade(slug: string, artistSlug: string): Value {
  return { slug, partOfCollections: [`${artist.slug}/${artistSlug}`] }
}

function trackMade(made: Made): Value {
  const id = made.trackId === undefined ? `spotify-${made.slug}` : made.trackId
  return {
    slug: made.slug,
    title: made.slug,
    status: made.status ?? "not-started",
    partOfCollections: [`${release.slug}/${made.releaseSlug}`],
    discNumber: made.disc ?? 1,
    position: made.position ?? 1,
    ...(made.key === undefined ? {} : made.key === null ? {} : { trackKey: made.key }),
    ...(id === null ? {} : { externalIdentity: [{ source: "spotify", externalId: id }] }),
  }
}

const RELEASES = [
  releaseMade("one-first", "one-singer"),
  releaseMade("one-second", "one-singer"),
  releaseMade("two-first", "two-singer"),
  releaseMade("three-first", "three-singer"),
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
    trackMade({ slug: "later", releaseSlug: "one-second", key: "same" }),
    trackMade({ slug: "earlier", releaseSlug: "one-first", key: "same" }),
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

test("tracks of one artist are ordered by release, then disc, then position", () => {
  const tracks = [
    trackMade({ slug: "d", releaseSlug: "one-second", position: 1 }),
    trackMade({ slug: "c", releaseSlug: "one-first", disc: 2, position: 1 }),
    trackMade({ slug: "b", releaseSlug: "one-first", disc: 1, position: 2 }),
    trackMade({ slug: "a", releaseSlug: "one-first", disc: 1, position: 1 }),
  ]
  expect(slugsOf(tracks)).toEqual(["a", "b", "c", "d"])
})

test("artists take turns in the order of their slugs", () => {
  const tracks = [
    trackMade({ slug: "one-a", releaseSlug: "one-first", position: 1 }),
    trackMade({ slug: "one-b", releaseSlug: "one-first", position: 2 }),
    trackMade({ slug: "one-c", releaseSlug: "one-first", position: 3 }),
    trackMade({ slug: "two-a", releaseSlug: "two-first", position: 1 }),
  ]
  expect(slugsOf(tracks)).toEqual(["one-a", "two-a", "one-b", "one-c"])
})
