import { expect, test } from "bun:test"
import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import { work } from "akasha/alan/collection/properties/within-collections.computed-property.code.ts"
import { awardWinningMovies } from "akasha/alan/collection/watching/show-collection/pages/award-winning-movies.show-collection.ts"
import type { Reach } from "akasha/page/computed-property/computed-property.page-type.ts"

const SHELF = "show-collection/shelf"

const CATEGORY = "show-collection/category"

const SEASONAL = "show-collection/seasonal"

const SERIES = "franchise/series"

const BASE: Collection = { ...awardWinningMovies, partOfCollections: [] }

function reaching(pages: Readonly<Record<string, Collection>>): Reach {
  const answered = (slug: string): Collection | null => {
    const page = pages[slug]
    if (page === undefined) return null
    return { ...page, withinCollections: work(page, reach) ?? undefined }
  }
  const reach: Reach = {
    target: <Held>(slug: string): Held | null => answered(slug) as Held | null,
    through: () => null,
    naming: () => [],
    file: () => null,
    folder: () => null,
  }
  return reach
}

const PAGES: Readonly<Record<string, Collection>> = {
  [SHELF]: BASE,
  [CATEGORY]: { ...BASE, partOfCollections: [SHELF] },
  [SEASONAL]: { ...BASE, partOfCollections: [SHELF] },
  [SERIES]: { ...BASE, partOfCollections: [CATEGORY] },
}

test("a collection sits inside its parents and everything above them", () => {
  const film: Collection = { ...BASE, partOfCollections: [SERIES] }
  expect(work(film, reaching(PAGES))).toEqual([
    { collection: SERIES },
    { collection: CATEGORY },
    { collection: SHELF },
  ])
})

test("a collection reached two ways is named once", () => {
  const film: Collection = { ...BASE, partOfCollections: [SERIES, SEASONAL] }
  expect(work(film, reaching(PAGES))).toEqual([
    { collection: SERIES },
    { collection: CATEGORY },
    { collection: SHELF },
    { collection: SEASONAL },
  ])
})

test("a collection part of nothing sits inside nothing", () => {
  expect(work(BASE, reaching(PAGES))).toBeNull()
})

test("a parent with no page is still named", () => {
  const film: Collection = { ...BASE, partOfCollections: ["franchise/missing"] }
  expect(work(film, reaching(PAGES))).toEqual([{ collection: "franchise/missing" }])
})
