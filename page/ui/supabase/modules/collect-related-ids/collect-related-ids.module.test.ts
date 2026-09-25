import { describe, expect, it } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { slug } from "akasha/page/properties/slug.text-property.ts"
import { textProperty } from "akasha/page/text-property/text-property.page-type.ts"
import {
  collectRelatedIds,
  type RelationSpec,
  relatedAsNamed,
} from "akasha/page/ui/supabase/modules/collect-related-ids/collect-related-ids.module.code.ts"
import { pageProperty } from "akasha/page/unique-kind/pages/page-property.unique-kind.ts"
import { uniqueKind } from "akasha/page/unique-kind/unique-kind.page-type.ts"

const CAP = 10
const TARGET = "flower"
const SPECS: readonly RelationSpec[] = [{ propertyId: "bloom", targetPageTypeSlug: TARGET }]
const AN_ID = "019dda20-a963-727d-8922-2712d94cd668"
const A_SLUG = "blue-rose"

describe("collectRelatedIds", () => {
  it("asks for a relation value that is a uuid by id", () => {
    const found = collectRelatedIds([{ properties: { bloom: AN_ID } }], SPECS, CAP)
    expect(found).toEqual([{ pageTypeSlug: TARGET, by: "id", values: [AN_ID] }])
  })

  it("asks for a relation value that is an address by the slug that address names", () => {
    const value = namedAs(TARGET, A_SLUG, null)
    const found = collectRelatedIds([{ properties: { bloom: value } }], SPECS, CAP)
    expect(found).toEqual([{ pageTypeSlug: TARGET, by: "slug", values: [A_SLUG] }])
  })

  it("asks the page type an address names rather than the one the property targets", () => {
    const value = namedAs("rose", A_SLUG, null)
    const found = collectRelatedIds([{ properties: { bloom: value } }], SPECS, CAP)
    expect(found).toEqual([{ pageTypeSlug: "rose", by: "slug", values: [A_SLUG] }])
  })

  it("parts an address from a uuid held on the same property", () => {
    const value = namedAs(TARGET, A_SLUG, null)
    const found = collectRelatedIds([{ properties: { bloom: [AN_ID, value] } }], SPECS, CAP)
    expect(found).toEqual([
      { pageTypeSlug: TARGET, by: "id", values: [AN_ID] },
      { pageTypeSlug: TARGET, by: "slug", values: [A_SLUG] },
    ])
  })

  it("asks for an address naming a scope by the slug at its end", () => {
    const value = namedAs(TARGET, A_SLUG, "spring")
    const found = collectRelatedIds([{ properties: { bloom: value } }], SPECS, CAP)
    expect(found).toEqual([{ pageTypeSlug: TARGET, by: "slug", values: [A_SLUG] }])
  })

  it("asks for a relation value naming no page type by slug of the target page type", () => {
    const found = collectRelatedIds([{ properties: { bloom: A_SLUG } }], SPECS, CAP)
    expect(found).toEqual([{ pageTypeSlug: TARGET, by: "slug", values: [A_SLUG] }])
  })
})

const SCOPED_TYPE_ID = "019dda20-0000-7000-8000-000000000002"
const FLOWER_TYPE_ID = "019dda20-0000-7000-8000-000000000003"
const SECTION = "section"
const FIRST_ID = "019dda20-a963-727d-8922-2712d94cd669"
const SECOND_ID = "019dda20-a963-727d-8922-2712d94cd66a"
const SHARED_SLUG = "opening"
const SECTION_SPECS: readonly RelationSpec[] = [{ propertyId: "part", targetPageTypeSlug: SECTION }]

const PAGE_TYPES = [
  {
    _id: SCOPED_TYPE_ID,
    properties: {
      slug: SECTION,
      pageTypeSlug: "page-type",
      properties: [
        {
          pageProperty: namedAs(textProperty.slug, slug.slug, null),
          required: true,
          many: false,
          unique: namedAs(uniqueKind.slug, pageProperty.slug, null),
          uniqueProperty: "relation-property/in-volume",
        },
      ],
    },
  },
  { _id: FLOWER_TYPE_ID, properties: { slug: TARGET, pageTypeSlug: "page-type" } },
]

function sectionIn(id: string, book: string) {
  return {
    _id: id,
    properties: {
      slug: SHARED_SLUG,
      pageTypeSlug: SECTION,
      inVolume: namedAs("volume", book, null),
    },
  }
}

const SECTIONS = [sectionIn(FIRST_ID, "first"), sectionIn(SECOND_ID, "second")]

function naming(value: string) {
  return [{ properties: { part: value } }]
}

describe("relatedAsNamed", () => {
  it("keeps only the page whose scoped address is named, of two sharing a slug in two scopes", () => {
    const named = naming(namedAs(SECTION, SHARED_SLUG, "first"))
    const kept = relatedAsNamed(SECTIONS, named, SECTION_SPECS, PAGE_TYPES)
    expect(kept.map((one) => one._id)).toEqual([FIRST_ID])
  })

  it("keeps a page whose slug is unique only within a scope where its id is named", () => {
    const kept = relatedAsNamed(SECTIONS, naming(SECOND_ID), SECTION_SPECS, PAGE_TYPES)
    expect(kept.map((one) => one._id)).toEqual([SECOND_ID])
  })

  it("keeps a page whose slug is unique across its page type where its slug is named", () => {
    const flower = { _id: AN_ID, properties: { slug: A_SLUG, pageTypeSlug: TARGET } }
    const kept = relatedAsNamed([flower], naming(namedAs(TARGET, A_SLUG, null)), SPECS, PAGE_TYPES)
    expect(kept).toEqual([flower])
  })
})
