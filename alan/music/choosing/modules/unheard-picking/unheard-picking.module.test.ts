import { expect, test } from "bun:test"
import { artist } from "akasha/alan/music/catalog/artist/artist.page-type.ts"
import { release } from "akasha/alan/music/catalog/release/release.page-type.ts"
import {
  pickingUnheard,
  unheard,
} from "akasha/alan/music/choosing/modules/unheard-picking/unheard-picking.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const FOLLOWED = new Set(["one-singer"])

const RELEASES: readonly Value[] = [
  {
    slug: "one-first",
    partOfCollections: [`${artist.slug}/one-singer`],
    publishedAt: "2020-03-01",
  },
]

function trackMade(slug: string, status: string): Value {
  return {
    slug,
    title: slug,
    status,
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
  return pickingUnheard(tracks, RELEASES, FOLLOWED).map((one) => one.slug)
}

test("a track Alan has heard is never wanted", () => {
  expect(unheard(trackMade("a", "not-started"))).toBe(true)
  expect(unheard(trackMade("a", "completed"))).toBe(false)
})

test("a track Alan has heard is never picked", () => {
  const tracks = [trackMade("a", "completed"), trackMade("b", "not-started")]
  expect(slugsOf(tracks)).toEqual(["b"])
})
