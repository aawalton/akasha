import { afterAll, expect, test } from "bun:test"
import { typesFileRunsNothing } from "akasha/check/code/pages/types-file-runs-nothing/types-file-runs-nothing.check-code.audit.code.ts"
import {
  AT,
  DECLARES,
  RUNS,
  scratch,
  tracked,
} from "akasha/check/code/pages/types-file-runs-nothing/types-file-runs-nothing.check-code.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree whose types files declare alone is let through", () => {
  expect(typesFileRunsNothing(tracked({ [AT]: DECLARES }))).toEqual([])
})

test("a variable no change names is refused, because an audit reads the whole tree", () => {
  const said = typesFileRunsNothing(tracked({ [AT]: RUNS }))
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("a variable")
})
