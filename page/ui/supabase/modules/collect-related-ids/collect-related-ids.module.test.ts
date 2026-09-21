import { describe, expect, it } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  collectRelatedIds,
  type RelationSpec,
} from "akasha/page/ui/supabase/modules/collect-related-ids/collect-related-ids.module.code.ts"

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
