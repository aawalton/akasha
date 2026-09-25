import { expect, test } from "bun:test"
import { isDefinitionTierSlug } from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"

test("page types are the definition tier", () => {
  expect(isDefinitionTierSlug("page-type")).toBe(true)
})

test("a slug naming no page type is no part of the definition tier", () => {
  expect(isDefinitionTierSlug("page-property-definition")).toBe(false)
})
