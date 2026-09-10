import { afterAll, expect, test } from "bun:test"
import { pageMatchesItsType } from "./page-matches-its-type.code-check.audit.code.ts"
import {
  scratch,
  THING_AT,
  THING_BODY,
  THING_EXTRA,
  tracked,
} from "./page-matches-its-type.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("an audit judges every page in the tree, no change naming one of them", () => {
  const root = tracked({ [THING_AT]: THING_EXTRA })

  const said = pageMatchesItsType(root)

  expect(said.map((one) => one.path)).toEqual([THING_AT])
  expect(said[0]?.reason).toContain("does not declare")
})

test("an audit lets through a tree whose pages carry what their types declare", () => {
  expect(pageMatchesItsType(tracked({ [THING_AT]: THING_BODY }))).toEqual([])
})
