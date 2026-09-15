import { afterAll, expect, test } from "bun:test"
import { typesFileRunsNothing } from "akasha/check/code/pages/types-file-runs-nothing/types-file-runs-nothing.check-code.check.code.ts"
import {
  AT,
  RUNS,
  rooted,
  scratch,
} from "akasha/check/code/pages/types-file-runs-nothing/types-file-runs-nothing.check-code.decision.test-fixtures.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { change } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

function judged(root: string, changed: readonly string[]): readonly Judged[] {
  const held = change(root, changed)
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return typesFileRunsNothing(held, cast.shadow)
}

test("a variable in a types file the change carries is refused, naming that path", () => {
  const said = judged(rooted({ [AT]: RUNS }), [AT])
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("a variable")
})

test("a path the change carries that is no types file is not judged", () => {
  const at = "akasha/held.module.code.ts"
  expect(judged(rooted({ [at]: RUNS }), [at])).toEqual([])
})
