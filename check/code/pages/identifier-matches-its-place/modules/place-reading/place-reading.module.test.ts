import { afterAll, expect, test } from "bun:test"
import {
  placed,
  scratch,
} from "akasha/check/code/pages/identifier-matches-its-place/identifier-matches-its-place.check-code.decision.test-fixtures.ts"
import {
  type Places,
  placesIn,
} from "akasha/check/code/pages/identifier-matches-its-place/modules/place-reading/place-reading.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { componentIdentifier } from "akasha/page/name-place/pages/component-identifier.name-place.ts"
import { constantIdentifier } from "akasha/page/name-place/pages/constant-identifier.name-place.ts"
import { derivedIdentifier } from "akasha/page/name-place/pages/derived-identifier.name-place.ts"
import { functionIdentifier } from "akasha/page/name-place/pages/function-identifier.name-place.ts"
import { typeIdentifier } from "akasha/page/name-place/pages/type-identifier.name-place.ts"

afterAll(scratch.sweep)

function reading(): Places {
  const root = placed()
  const shadow = shadowAt(root)
  return placesIn(root, shadow.index, shadow.codeAt)
}

test("each place is answered with the format that place's own page states", () => {
  const places = reading()
  expect(places.typeIdentifier.nameFormat).toBe(typeIdentifier.nameFormat)
  expect(places.functionIdentifier.nameFormat).toBe(functionIdentifier.nameFormat)
  expect(places.componentIdentifier.nameFormat).toBe(componentIdentifier.nameFormat)
  expect(places.constantIdentifier.nameFormat).toBe(constantIdentifier.nameFormat)
  expect(places.derivedIdentifier.nameFormat).toBe(derivedIdentifier.nameFormat)
})

test("each place is answered with a matching the format's own code makes", () => {
  const places = reading()
  expect(places.constantIdentifier.matching("HELD_AT")).toBe(true)
  expect(places.constantIdentifier.matching("heldAt")).toBe(false)
  expect(places.derivedIdentifier.matching("heldAt")).toBe(true)
  expect(places.derivedIdentifier.matching("HeldAt")).toBe(false)
  expect(places.typeIdentifier.matching("HeldAt")).toBe(true)
})

test("a repo whose index carries no fixed name answers none", () => {
  const places = reading()
  expect(places.fixed.size).toBe(0)
  expect(places.loaded.size).toBe(0)
  expect(places.filed.size).toBe(0)
})
