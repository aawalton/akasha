import { describe, expect, it } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { buildPageResolver } from "akasha/page/ui/component/view-engine/modules/build-page-resolver/build-page-resolver.module.code.ts"

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
