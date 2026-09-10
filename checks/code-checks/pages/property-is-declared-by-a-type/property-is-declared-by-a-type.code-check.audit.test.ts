import { afterAll, expect, test } from "bun:test"
import { pageFiled } from "@akasha/indexes/testing"
import {
  claiming,
  edging,
  filing,
  pathFor,
  put,
} from "../../../modules/scratch/check-scratch.module.code.ts"
import { propertyIsDeclaredByAType } from "./property-is-declared-by-a-type.code-check.audit.code.ts"
import {
  body,
  ONE,
  rooted,
  scratch,
  TWO,
  tracked,
  UP_AT,
} from "./property-is-declared-by-a-type.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

const HELD_AT = pathFor("relation-property", "held")

function held(root: string): string {
  filing(root, "relation-property", "held", ONE)
  put(root, HELD_AT, body("relation-property", "held", ONE))
  claiming(root, HELD_AT, HELD_AT, ONE)
  return tracked(root)
}

test("an audit judges every page in the tree, no change naming one of them", () => {
  const said = propertyIsDeclaredByAType(held(rooted()))

  expect(said.map((one) => one.path)).toEqual([HELD_AT])
  expect(said[0]?.reason).toContain("`relation-property/held`")
})

test("an audit lets through a tree whose every page property a page type declares", () => {
  const root = rooted()
  edging(root, ONE, "page-property", TWO, UP_AT)
  pageFiled(root, TWO, UP_AT)

  expect(propertyIsDeclaredByAType(held(root))).toEqual([])
})
