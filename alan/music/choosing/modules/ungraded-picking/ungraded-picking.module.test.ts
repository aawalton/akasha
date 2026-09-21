import { expect, test } from "bun:test"
import { artist } from "akasha/alan/music/catalog/artist/artist.page-type.ts"
import { release } from "akasha/alan/music/catalog/release/release.page-type.ts"
import {
  graded,
  pickingUngraded,
  ungraded,
} from "akasha/alan/music/choosing/modules/ungraded-picking/ungraded-picking.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const FOLLOWED = new Set(["one-singer"])

const RELEASES: readonly Value[] = [
  {
    slug: "one-first",
    partOfCollections: [`${artist.slug}/one-singer`],
    publishedAt: "2020-03-01",
  },
]

function trackMade(slug: string, status: string, rank?: string): Value {
  return {
    slug,
    title: slug,
    status,
    ...(rank === undefined ? {} : { rank }),
    carriedBy: [
      {
        release: `${release.slug}/one-first`,
        discNumber: 1,
        position: 1,
        externalId: `spotify-${slug}`,
      },
    ],
  }
}

function slugsOf(tracks: readonly Value[]): readonly string[] {
  return pickingUngraded(tracks, RELEASES, FOLLOWED).map((one) => one.slug)
}

test("a track Alan has not heard is never picked", () => {
  const tracks = [trackMade("a", "not-started"), trackMade("b", "completed")]
  expect(slugsOf(tracks)).toEqual(["b"])
})

test("a track stating a rank is never picked", () => {
  const tracks = [trackMade("a", "completed", "A-"), trackMade("b", "completed")]
  expect(slugsOf(tracks)).toEqual(["b"])
})

test("a track stating an empty rank is picked", () => {
  expect(slugsOf([trackMade("a", "completed", "")])).toEqual(["a"])
})

test("a track carries a grade where that track states a rank", () => {
  expect(graded(trackMade("a", "completed", "S"))).toBe(true)
  expect(graded(trackMade("a", "completed"))).toBe(false)
  expect(graded(trackMade("a", "completed", ""))).toBe(false)
})

test("a track is wanted where Alan has heard it and has not graded it", () => {
  expect(ungraded(trackMade("a", "completed"))).toBe(true)
  expect(ungraded(trackMade("a", "not-started"))).toBe(false)
  expect(ungraded(trackMade("a", "completed", "B+"))).toBe(false)
})
