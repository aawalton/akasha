import { expect, test } from "bun:test"
import { isInPartOf } from "./in-part-of.page-address-kind.code.ts"

test("an address naming a parent is of this kind", () => {
  expect(
    isInPartOf({
      pageTypeSlug: "story-chapter-read",
      partOf: { pageTypeSlug: "story-read", propertySlug: "slug", value: "the-wandering-inn" },
      propertySlug: "slug",
      value: "chapter-1",
    })
  ).toBe(true)
})

test("a parent named by id is named by an address all the same", () => {
  expect(
    isInPartOf({
      pageTypeSlug: "story-chapter-read",
      partOf: { id: "01a04edd-897d-7b88-90d8-c86522baad1d" },
      propertySlug: "slug",
      value: "chapter-1",
    })
  ).toBe(true)
})

test("an address naming no parent is of another kind", () => {
  expect(isInPartOf({ pageTypeSlug: "role", propertySlug: "slug", value: "definer" })).toBe(false)
})
