import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change } from "../../../modules/scratch/check-scratch.module.code.ts"
import { typesFileRunsNothing } from "./types-file-runs-nothing.code-check.code.ts"
import {
  AT,
  RUNS,
  rooted,
  scratch,
} from "./types-file-runs-nothing.code-check.decision.test-fixtures.ts"

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
