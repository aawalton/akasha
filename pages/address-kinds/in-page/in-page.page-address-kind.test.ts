import { expect, test } from "bun:test"
import {
  filedInPage,
  isInPage,
} from "akasha/pages/address-kinds/in-page/in-page.page-address-kind.code.ts"

test("an address stating an id is of this kind", () => {
  expect(isInPage({ id: "01a04edd-897d-7b88-90d8-c86522baad1d" })).toBe(true)
})

test("an address stating a page type and a property is of another kind", () => {
  expect(isInPage({ pageTypeSlug: "role", propertySlug: "slug", value: "definer" })).toBe(false)
})

test("an address stating nothing at all is of no kind", () => {
  expect(isInPage({})).toBe(false)
})

test("an address of this kind is filed under no scope, by the property `id`", () => {
  expect(filedInPage({ id: "01a04edd-897d-7b88-90d8-c86522baad1d" })).toEqual({
    uniqueKind: "page",
    scope: "",
    propertySlug: "id",
    said: "01a04edd-897d-7b88-90d8-c86522baad1d",
  })
})
