import { expect, test } from "bun:test"
import { join } from "node:path"
import {
  filedInPageProperty,
  isInPageProperty,
} from "akasha/page/address-kind/in-page-property/in-page-property.page-address-kind.code.ts"
import { keyFor } from "akasha/page/index/modules/identifying/index-identifying.module.code.ts"

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

const SCOPED = [
  ["story-chapter-read", "story-read-slug", "the-wandering-inn"],
  ["release", "year", "1998"],
  ["book-section", "section-of-slug", "eu-citizenship"],
] as const

test("a scope is the path a page type, a scope property and a scope value name", () => {
  for (const [pageTypeSlug, scopePropertySlug, scopeValue] of SCOPED) {
    const filed = filedInPageProperty({
      pageTypeSlug,
      scopePropertySlug,
      scopeValue,
      propertySlug: "slug",
      value: "austria",
    })
    expect(filed.scope).toBe(join(pageTypeSlug, scopePropertySlug, scopeValue))
  }
})

test("a scope value saying nothing is filed under the key a path join names", () => {
  const filed = filedInPageProperty({
    pageTypeSlug: "release",
    scopePropertySlug: "year",
    scopeValue: "",
    propertySlug: "slug",
    value: "the-first",
  })
  expect(keyFor(filed)).toBe("page-property/release/year/slug/the-first")
})
