import { expect, test } from "bun:test"
import { isInPage } from "./in-page.page-address-kind.code.ts"

test("an address stating an id is of this kind", () => {
  expect(isInPage({ id: "01a04edd-897d-7b88-90d8-c86522baad1d" })).toBe(true)
})

test("an address stating a page type and a property is of another kind", () => {
  expect(isInPage({ pageTypeSlug: "role", propertySlug: "slug", value: "definer" })).toBe(false)
})

test("an address stating nothing at all is of no kind", () => {
  expect(isInPage({})).toBe(false)
})
