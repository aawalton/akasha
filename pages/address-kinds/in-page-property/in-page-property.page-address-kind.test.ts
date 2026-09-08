import { expect, test } from "bun:test"
import { isInPageProperty } from "./in-page-property.page-address-kind.code.ts"

test("an address naming a scope property and its value is of this kind", () => {
  expect(
    isInPageProperty({
      pageTypeSlug: "story-chapter-read",
      scopePropertySlug: "story-read-slug",
      scopeValue: "the-wandering-inn",
      propertySlug: "slug",
      value: "chapter-1",
    })
  ).toBe(true)
})

test("a scope is any kind of page property rather than a relation alone", () => {
  expect(
    isInPageProperty({
      pageTypeSlug: "release",
      scopePropertySlug: "year",
      scopeValue: "1998",
      propertySlug: "slug",
      value: "the-first",
    })
  ).toBe(true)
})

test("an address naming no scope property is of another kind", () => {
  expect(isInPageProperty({ pageTypeSlug: "role", propertySlug: "slug", value: "definer" })).toBe(
    false
  )
})
