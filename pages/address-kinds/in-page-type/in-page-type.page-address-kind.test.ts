import { expect, test } from "bun:test"
import { filedInPageType, isInPageType } from "./in-page-type.page-address-kind.code.ts"

test("an address naming a page type and a property is of this kind", () => {
  expect(isInPageType({ pageTypeSlug: "role", propertySlug: "slug", value: "definer" })).toBe(true)
})

test("an address naming a scope property as well is of another kind", () => {
  expect(
    isInPageType({
      pageTypeSlug: "story-chapter-read",
      scopePropertySlug: "story-read-slug",
      scopeValue: "the-wandering-inn",
      propertySlug: "slug",
      value: "chapter-1",
    })
  ).toBe(false)
})

test("an address naming an id is of another kind", () => {
  expect(isInPageType({ id: "01a04edd-897d-7b88-90d8-c86522baad1d" })).toBe(false)
})

test("an address of this kind is filed under the page type it names", () => {
  expect(filedInPageType({ pageTypeSlug: "role", propertySlug: "slug", value: "definer" })).toEqual(
    {
      uniqueKind: "page-type",
      scope: "role",
      propertySlug: "slug",
      said: "definer",
    }
  )
})
