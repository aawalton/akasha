import { afterAll, expect, test } from "bun:test"
import { lintClean } from "./lint-clean.code-check.audit.code.ts"
import {
  CLEAN,
  RULE,
  scratch,
  tracked,
  UNUSED,
} from "./lint-clean.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("an audit judges every file in the tree the linter reads, no change naming one", () => {
  const root = tracked({ "akasha/one.ts": UNUSED, "akasha/two.ts": CLEAN })

  const judged = lintClean(root)

  expect(judged.map((one) => one.path)).toEqual(["akasha/one.ts"])
  expect(judged[0]?.reason).toContain(RULE)
})

test("an audit lets through a tree the linter finds nothing in", () => {
  const root = tracked({ "akasha/one.ts": CLEAN })

  expect(lintClean(root)).toEqual([])
})
