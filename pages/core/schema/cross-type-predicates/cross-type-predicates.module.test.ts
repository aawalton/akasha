import { expect, test } from "bun:test"
import {
  CROSS_TYPE_PREDICATES,
  getCrossTypePredicate,
} from "./cross-type-predicates.module.code.ts"

test("a predicate is reached by the key a view writes", () => {
  expect(getCrossTypePredicate("favorites")?.filters[0]?.propertyId).toBe("favoritedAt")
  expect(getCrossTypePredicate("recently-viewed")?.filters[0]?.propertyId).toBe("lastViewedAt")
})

test("a predicate is keyed as a view spells a predicate", () => {
  for (const key of Object.keys(CROSS_TYPE_PREDICATES)) expect(key).toBe(key.toLowerCase())
})

test("a predicate is filed under the key it states", () => {
  for (const [key, one] of Object.entries(CROSS_TYPE_PREDICATES)) expect(one.key).toBe(key)
})

test("a key no predicate states is answered with nothing", () => {
  expect(getCrossTypePredicate("FAVORITES")).toBeUndefined()
})
