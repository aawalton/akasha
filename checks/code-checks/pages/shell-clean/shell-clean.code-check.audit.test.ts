import { afterAll, expect, test } from "bun:test"
import { shellClean } from "./shell-clean.code-check.audit.code.ts"
import {
  CLEAN,
  FAULT,
  ONE,
  rooted,
  scratch,
  tracked,
} from "./shell-clean.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("an audit judges every shell script in the tree, no change naming one of them", () => {
  const said = shellClean(tracked(rooted(), { [ONE]: FAULT }))

  expect(said.map((one) => one.path)).toEqual([ONE])
  expect(said[0]?.reason).toContain("SC2086")
})

test("an audit lets through a tree the linter finds nothing in", () => {
  expect(shellClean(tracked(rooted(), { [ONE]: CLEAN }))).toEqual([])
})
