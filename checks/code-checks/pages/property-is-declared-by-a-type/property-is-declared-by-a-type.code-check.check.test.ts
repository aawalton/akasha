import { afterAll, expect, test } from "bun:test"
import { propertyIsDeclaredByAType } from "akasha/checks/code-checks/pages/property-is-declared-by-a-type/property-is-declared-by-a-type.code-check.check.code.ts"
import {
  body,
  ONE,
  rooted,
  scratch,
  TWO,
  UP_AT,
} from "akasha/checks/code-checks/pages/property-is-declared-by-a-type/property-is-declared-by-a-type.code-check.decision.test-fixtures.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import {
  edging,
  filing,
  landing,
  pathFor,
} from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { pageFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import { shadowFor } from "akasha/pages/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

const HELD_AT = pathFor("relation-property", "held")

function held(root: string): Change {
  return landing(root, { [HELD_AT]: body("relation-property", "held", ONE) })
}

function judged(change: Change): readonly Judged[] {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return propertyIsDeclaredByAType(change, cast.shadow)
}

test("the check refuses a page property the change carries that no page type declares", () => {
  const root = rooted()
  filing(root, "relation-property", "held", ONE)

  const said = judged(held(root))

  expect(said.map((one) => one.path)).toEqual([HELD_AT])
  expect(said[0]?.reason).toContain("`relation-property/held`")
})

test("the check lets through a page property a page type declares", () => {
  const root = rooted()
  filing(root, "relation-property", "held", ONE)
  edging(root, ONE, "page-property", TWO, UP_AT)
  pageFiled(root, TWO, UP_AT)

  expect(judged(held(root))).toEqual([])
})

test("the check takes a page as its input and no other body", () => {
  const root = rooted()
  const cast = shadowFor(held(root))
  if ("refused" in cast) throw new Error(cast.refused)

  expect(propertyIsDeclaredByAType.isInput(HELD_AT, cast.shadow)).toBe(true)
  expect(propertyIsDeclaredByAType.isInput("akasha/held.module.code.ts", cast.shadow)).toBe(false)
})
