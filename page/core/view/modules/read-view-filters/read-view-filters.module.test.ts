import { expect, test } from "bun:test"
import { NEVER_MATCH_VALUE } from "akasha/page/access/modules/sentinels/sentinels.module.code.ts"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import {
  besideNarrows,
  type DefinitionsOf,
  narrowedBy,
  type ReadFilters,
  readViewFilters,
  relatedFilterOf,
  withRelatedKept,
} from "akasha/page/core/view/modules/read-view-filters/read-view-filters.module.code.ts"

const TALE = "tale"

const PART: readonly PropertyDefinition[] = [
  { id: "ownRemaining", title: "Own Remaining", type: "number" },
  { id: "removedAt", title: "Removed At", type: "instant" },
  { id: "tale", title: "Tale", type: "relation", config: { targetPageTypeSlug: TALE } },
  { id: "loose", title: "Loose", type: "relation" },
]

const TALE_DEFINED: readonly PropertyDefinition[] = [
  { id: "following", title: "Following", type: "boolean" },
  { id: "title", title: "Title", type: "text" },
]

const definitionsOf: DefinitionsOf = (slug) => (slug === TALE ? TALE_DEFINED : undefined)

function refusalOf(got: ReadFilters): string {
  return "refused" in got ? got.refused : ""
}

test("a narrow value is read as the type its property holds", () => {
  const filters = [{ propertyId: "ownRemaining", operator: "gte", value: "1" }]
  expect(readViewFilters(filters, PART, definitionsOf)).toEqual({
    own: [{ propertyId: "ownRemaining", operator: "gte", value: 1 }],
    related: [],
  })
})

test("a narrow value its property's type cannot hold is refused", () => {
  const filters = [{ propertyId: "ownRemaining", operator: "gte", value: "some" }]
  expect(refusalOf(readViewFilters(filters, PART, definitionsOf))).toContain("holds a number")
})

test("a narrow on a key the page type does not declare is refused rather than dropped", () => {
  const filters = [{ propertyId: "following", operator: "equals", value: "true" }]
  expect(refusalOf(readViewFilters(filters, PART, definitionsOf))).toContain("declares nothing for")
})

test("a narrow reaching through a relation is read on the page type that relation names", () => {
  const filters = [{ propertyId: "tale.following", operator: "equals", value: "true" }]
  expect(readViewFilters(filters, PART, definitionsOf)).toEqual({
    own: [],
    related: [
      {
        relation: "tale",
        pageTypeSlug: TALE,
        filter: { propertyId: "following", operator: "equals", value: true },
        definitions: TALE_DEFINED,
      },
    ],
  })
})

test("a narrow reaching a key the related page type does not declare is refused", () => {
  const filters = [{ propertyId: "tale.grade", operator: "equals", value: "A" }]
  expect(refusalOf(readViewFilters(filters, PART, definitionsOf))).toContain("the `tale` it names")
})

test("a narrow reaching through a relation naming no page type is refused", () => {
  const filters = [{ propertyId: "loose.following", operator: "equals", value: "true" }]
  expect(refusalOf(readViewFilters(filters, PART, definitionsOf))).toContain("names no page type")
})

test("narrows wait while a page type's properties are unread", () => {
  const filters = [{ propertyId: "tale.following", operator: "equals", value: "true" }]
  expect(readViewFilters(filters, PART, () => undefined)).toEqual({ unread: true })
  expect(readViewFilters(filters, [], definitionsOf)).toEqual({ unread: true })
})

const TALE_TOLD = "tale-told"

const TALE_KINDS: ReadonlySet<string> = new Set([TALE, TALE_TOLD])

const TALES = [
  { pageTypeSlug: TALE, slug: "second", following: true },
  { pageTypeSlug: TALE_TOLD, slug: "first", following: true },
  { pageTypeSlug: TALE, slug: "dropped", following: false },
  { pageTypeSlug: "other", slug: "stray", following: true },
]

test("a related narrow becomes the relation naming every related page passing it", () => {
  const related = {
    relation: "tale",
    pageTypeSlug: TALE,
    filter: { propertyId: "following", operator: "equals", value: true },
    definitions: TALE_DEFINED,
  }
  expect(relatedFilterOf(related, TALES, TALE_KINDS)).toEqual({
    propertyId: "tale",
    operator: "includes",
    value: [`${TALE_TOLD}/first`, `${TALE}/second`],
  })
})

test("a related narrow no related page passes lets no page through", () => {
  const related = {
    relation: "tale",
    pageTypeSlug: TALE,
    filter: { propertyId: "title", operator: "equals", value: "Nobody" },
    definitions: TALE_DEFINED,
  }
  expect(relatedFilterOf(related, TALES, TALE_KINDS).value).toEqual([NEVER_MATCH_VALUE])
})

const IN_THE_ALBUM = { propertyId: "albums", operator: "equals", value: "image-album/dusk" }

const GRADED = { propertyId: "grade", operator: "includes", value: ["A", "S"] }

test("a page's narrow is applied on top of the view's own narrows", () => {
  expect(narrowedBy({ version: 1, filters: [GRADED] }, [IN_THE_ALBUM]).filters).toEqual([
    GRADED,
    IN_THE_ALBUM,
  ])
})

test("a page's narrow narrows a view stating no narrow of its own", () => {
  expect(narrowedBy({ version: 1 }, [IN_THE_ALBUM]).filters).toEqual([IN_THE_ALBUM])
})

test("no narrow from the page leaves the view as it was", () => {
  const config = { version: 1 as const, filters: [GRADED] }
  expect(narrowedBy(config, [])).toBe(config)
})

test("the narrows a view shows leave out the page's narrow", () => {
  expect(besideNarrows([GRADED, IN_THE_ALBUM], [IN_THE_ALBUM])).toEqual([GRADED])
})

test("a view narrow matching the page's narrow is kept once the page's copy is left out", () => {
  expect(besideNarrows([IN_THE_ALBUM, GRADED, IN_THE_ALBUM], [IN_THE_ALBUM])).toEqual([
    IN_THE_ALBUM,
    GRADED,
  ])
})

test("a page's narrow the view never read leaves the view's narrows whole", () => {
  expect(besideNarrows([GRADED], [IN_THE_ALBUM])).toEqual([GRADED])
})

const FOLLOWED = { propertyId: "tale.following", operator: "equals", value: "true" }

const UNREAD = { propertyId: "ownRemaining", operator: "gte", value: "1" }

test("a view written back from the narrows it shows keeps the related narrow it never showed", () => {
  const stated = [FOLLOWED, UNREAD]
  const read = readViewFilters(stated, PART, definitionsOf)
  const shown = "own" in read ? read.own : []
  expect(withRelatedKept(shown, stated, PART)).toEqual([
    { propertyId: "ownRemaining", operator: "gte", value: 1 },
    FOLLOWED,
  ])
})

test("a related narrow already written back is kept once", () => {
  expect(withRelatedKept([FOLLOWED], [FOLLOWED], PART)).toEqual([FOLLOWED])
})

test("an own narrow taken off the view is not put back", () => {
  expect(withRelatedKept([], [UNREAD], PART)).toEqual([])
})
