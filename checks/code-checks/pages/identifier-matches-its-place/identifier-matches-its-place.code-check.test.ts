import { afterAll, expect, test } from "bun:test"
import { shadowAt } from "@akasha/pages/shadow"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { change, proposing } from "../../../modules/scratch/check-scratch.module.code.ts"
import { identifierMatchesItsPlace } from "./identifier-matches-its-place.code-check.code.ts"
import {
  placed,
  scratch,
} from "./identifier-matches-its-place.code-check.decision.test-fixtures.ts"

const HELD = "akasha/held.ts"

const NOTES = "akasha/held.md"

const BAD_FUNCTION = "export function BadName() {}\n"

afterAll(scratch.sweep)

test("the check judges each body the change carries by the formats the index reaches", () => {
  const root = placed()
  writing(root, HELD, BAD_FUNCTION)
  const said = identifierMatchesItsPlace(change(root, [HELD]), shadowAt(root))
  expect(said.map((one) => one.path)).toEqual([HELD])
  expect(said[0]?.reason).toContain("the function `BadName`")
})

test("the body judged is the one the change proposes rather than the one on disk", () => {
  const root = placed()
  writing(root, HELD, "export function held() {}\n")
  const held = change(root, [HELD], proposing(root, HELD, BAD_FUNCTION))
  expect(identifierMatchesItsPlace(held, shadowAt(root)).map((one) => one.path)).toEqual([HELD])
})

test("a change carrying no TypeScript body is passed over", () => {
  const root = placed()
  writing(root, NOTES, BAD_FUNCTION)
  expect(identifierMatchesItsPlace(change(root, [NOTES]), shadowAt(root))).toEqual([])
})
