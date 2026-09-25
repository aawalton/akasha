import { describe, expect, it } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { slug } from "akasha/page/properties/slug.text-property.ts"
import { textProperty } from "akasha/page/text-property/text-property.page-type.ts"
import { buildPageResolver } from "akasha/page/ui/component/view-engine/modules/build-page-resolver/build-page-resolver.module.code.ts"
import { pageProperty } from "akasha/page/unique-kind/pages/page-property.unique-kind.ts"
import { uniqueKind } from "akasha/page/unique-kind/unique-kind.page-type.ts"

const PAGE_TYPE_ID = "019dda20-0000-7000-8000-000000000001"
const PAGE_ID = "019dda20-a963-727d-8922-2712d94cd668"
const PAGE_TYPE_SLUG = "flower"
const PAGE_SLUG = "blue-rose"
const ADDRESS = namedAs(PAGE_TYPE_SLUG, PAGE_SLUG, null)

const PAGE_TYPES = [
  { _id: PAGE_TYPE_ID, properties: { slug: PAGE_TYPE_SLUG, pageTypeSlug: "page-type" } },
]

const PAGES = [
  {
    _id: PAGE_ID,
    properties: {
      slug: PAGE_SLUG,
      title: "Blue Rose",
      pageTypeId: PAGE_TYPE_ID,
      pageTypeSlug: PAGE_TYPE_SLUG,
    },
  },
]

describe("buildPageResolver", () => {
  it("answers a page asked for by its id", () => {
    const found = buildPageResolver([PAGE_TYPES, PAGES]).resolve(PAGE_ID)
    expect(found?.title).toBe("Blue Rose")
  })

  it("answers a page asked for by its address", () => {
    const found = buildPageResolver([PAGE_TYPES, PAGES]).resolve(ADDRESS)
    expect(found).toEqual({ id: PAGE_ID, title: "Blue Rose" })
  })

  it("names the page type off the page type id where the page states no page type slug", () => {
    const unstated = [
      {
        _id: PAGE_ID,
        properties: { slug: PAGE_SLUG, title: "Blue Rose", pageTypeId: PAGE_TYPE_ID },
      },
    ]
    const found = buildPageResolver([PAGE_TYPES, unstated]).resolve(ADDRESS)
    expect(found?.id).toBe(PAGE_ID)
  })

  it("answers nothing for an address no page carries", () => {
    const found = buildPageResolver([PAGE_TYPES, PAGES]).resolve(
      namedAs(PAGE_TYPE_SLUG, "none", null)
    )
    expect(found).toBe(null)
  })

  it("lists a page once though that page is keyed twice", () => {
    expect(buildPageResolver([PAGES]).listPages().length).toBe(1)
  })
})

const SCOPED_TYPE_ID = "019dda20-0000-7000-8000-000000000002"
const SCOPED_TYPE_SLUG = "chapter"
const FIRST_ID = "019dda20-a963-727d-8922-2712d94cd669"
const SECOND_ID = "019dda20-a963-727d-8922-2712d94cd66a"
const SHARED_SLUG = "opening"

const SCOPED_TYPES = [
  {
    _id: SCOPED_TYPE_ID,
    properties: {
      slug: SCOPED_TYPE_SLUG,
      pageTypeSlug: "page-type",
      properties: [
        {
          pageProperty: namedAs(textProperty.slug, slug.slug, null),
          required: true,
          many: false,
          unique: namedAs(uniqueKind.slug, pageProperty.slug, null),
          uniqueProperty: "relation-property/part-of",
        },
      ],
    },
  },
]

function chapterIn(id: string, partOf: string) {
  return {
    _id: id,
    properties: {
      slug: SHARED_SLUG,
      title: SHARED_SLUG,
      pageTypeId: SCOPED_TYPE_ID,
      pageTypeSlug: SCOPED_TYPE_SLUG,
      partOf,
    },
  }
}

const CHAPTERS = [chapterIn(FIRST_ID, "volume/first"), chapterIn(SECOND_ID, "volume/second")]

describe("buildPageResolver over a slug unique only within a scope", () => {
  it("answers each of two pages sharing a slug by the address naming its own scope", () => {
    const resolver = buildPageResolver([SCOPED_TYPES, CHAPTERS])
    expect(resolver.resolve(namedAs(SCOPED_TYPE_SLUG, SHARED_SLUG, "first"))?.id).toBe(FIRST_ID)
    expect(resolver.resolve(namedAs(SCOPED_TYPE_SLUG, SHARED_SLUG, "second"))?.id).toBe(SECOND_ID)
  })

  it("answers nothing for the address naming no scope", () => {
    const found = buildPageResolver([SCOPED_TYPES, CHAPTERS]).resolve(
      namedAs(SCOPED_TYPE_SLUG, SHARED_SLUG, null)
    )
    expect(found).toBe(null)
  })

  it("names the scope by its own slug where the scope is itself scoped", () => {
    const nested = [chapterIn(FIRST_ID, namedAs(SCOPED_TYPE_SLUG, "prelude", "first"))]
    const found = buildPageResolver([SCOPED_TYPES, nested]).resolve(
      namedAs(SCOPED_TYPE_SLUG, SHARED_SLUG, "prelude")
    )
    expect(found?.id).toBe(FIRST_ID)
  })
})
