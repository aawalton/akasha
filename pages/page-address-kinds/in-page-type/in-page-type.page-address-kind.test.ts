import { expect, test } from "bun:test"
import { isInPageType } from "./in-page-type.page-address-kind.code.ts"

test("an address naming a page type and a property is of this kind", () => {
  expect(isInPageType({ pageTypeSlug: "role", propertySlug: "slug", value: "definer" })).toBe(true)
})

test("an address naming a parent as well is of another kind", () => {
  expect(
    isInPageType({
      pageTypeSlug: "story-chapter-read",
      partOf: { pageTypeSlug: "story-read", propertySlug: "slug", value: "the-wandering-inn" },
      propertySlug: "slug",
      value: "chapter-1",
    })
  ).toBe(false)
})

test("an address naming an id is of another kind", () => {
  expect(isInPageType({ id: "01a04edd-897d-7b88-90d8-c86522baad1d" })).toBe(false)
})
