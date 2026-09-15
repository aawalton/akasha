import { afterAll, expect, test } from "bun:test"
import { noRefusedSyntax } from "akasha/check/code/pages/no-refused-syntax/no-refused-syntax.check-code.check.code.ts"
import {
  JUDGED_AT,
  ruled,
  scratch,
  TEXT,
} from "akasha/check/code/pages/no-refused-syntax/no-refused-syntax.check-code.decision.test-fixtures.ts"
import { onDisk } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

function judged(root: string, changed: readonly string[]): readonly Judged[] {
  const both = onDisk(root)
  return noRefusedSyntax({ root, changed, before: both, after: both }, shadowAt(root))
}

test("a text the change carries is judged by every rule the index names", () => {
  const root = ruled("akasha-syntax-rule-check-")
  writing(root, JUDGED_AT, TEXT)
  const said = judged(root, [JUDGED_AT])
  expect(said.map((one) => one.path)).toEqual([JUDGED_AT])
  expect(said[0]?.reason).toContain("`probe`")
})

test("a path the change carries that is no text is not judged", () => {
  const root = ruled("akasha-syntax-rule-check-")
  const at = "akasha/one/notes.txt"
  writing(root, at, TEXT)
  expect(judged(root, [at])).toEqual([])
})
