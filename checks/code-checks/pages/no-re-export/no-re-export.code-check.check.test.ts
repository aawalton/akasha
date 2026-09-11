import { afterAll, expect, test } from "bun:test"
import { noReExport } from "akasha/checks/code-checks/pages/no-re-export/no-re-export.code-check.check.code.ts"
import {
  AT,
  rooted,
  SENT,
  scratch,
} from "akasha/checks/code-checks/pages/no-re-export/no-re-export.code-check.decision.test-fixtures.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { change } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { shadowFor } from "akasha/pages/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

function judged(root: string, changed: readonly string[]): readonly Judged[] {
  const held = change(root, changed)
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return noReExport(held, cast.shadow)
}

test("a re-export in a text the change carries is refused, naming that path", () => {
  const said = judged(rooted({ [AT]: SENT }), [AT])
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("`./b.ts`")
})

test("a path the change carries that is no text is not judged", () => {
  const at = "akasha/notes.txt"
  expect(judged(rooted({ [at]: SENT }), [at])).toEqual([])
})
