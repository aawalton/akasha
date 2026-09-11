import { expect, test } from "bun:test"
import { requiredIn } from "akasha/changes/modules/key-requiring/key-requiring.module.code.ts"
import {
  declaring,
  worldKnowing,
} from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import type { Carried } from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"

const PAGE = "akasha/one/held.module.ts"

const BESIDE = "akasha/one/held.module.code.ts"

const NAMES_NO_PAGE = "akasha/one/README"

const DECLARED: readonly Carried[] = [declaring("slug", true), declaring("definition", false)]

function requiring(at: string, key: string, held: readonly Carried[] | null = DECLARED) {
  return requiredIn(worldKnowing({}, held), { at, key })
}

test("a key the page type declares as required is required", () => {
  expect(requiring(PAGE, "slug")).toBe(true)
})

test("a key the page type declares as not required is not required", () => {
  expect(requiring(PAGE, "definition")).toBe(false)
})

test("a key the page type declares no property under is not required", () => {
  expect(requiring(PAGE, "cover")).toBe(false)
})

test("a page type the index answers nothing for is answered as neither required nor not", () => {
  expect(requiring(PAGE, "slug", null)).toBe(null)
})

test("a path naming no page is answered as neither required nor not", () => {
  expect(requiring(NAMES_NO_PAGE, "slug")).toBe(null)
})

test("a file beside a page rather than the page is answered as neither required nor not", () => {
  expect(requiring(BESIDE, "slug")).toBe(null)
})
