import { expect, test } from "bun:test"
import { filedInPageProperty, isInPageProperty } from "./in-page-property.page-address-kind.code.ts"

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

test("an address of this kind is filed under its page type, scope property and scope value", () => {
  expect(
    filedInPageProperty({
      pageTypeSlug: "book-section",
      scopePropertySlug: "section-of-slug",
      scopeValue: "eu-citizenship",
      propertySlug: "slug",
      value: "austria",
    })
  ).toEqual({
    uniqueKind: "page-property",
    scope: "book-section/section-of-slug/eu-citizenship",
    propertySlug: "slug",
    said: "austria",
  })
})
