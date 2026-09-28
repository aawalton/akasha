import { expect, test } from "bun:test"
import { NEVER_MATCH_VALUE } from "akasha/page/access/modules/sentinels/sentinels.module.code.ts"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import {
  type DefinitionsOf,
  type ReadFilters,
  readViewFilters,
  relatedFilterOf,
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
