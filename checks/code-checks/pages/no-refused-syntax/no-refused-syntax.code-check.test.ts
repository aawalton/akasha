import { afterAll, expect, test } from "bun:test"
import { shadowAt } from "@akasha/pages/shadow"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { onDisk } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { noRefusedSyntax } from "./no-refused-syntax.code-check.code.ts"
import {
  JUDGED_AT,
  ruled,
  scratch,
  TEXT,
} from "./no-refused-syntax.code-check.decision.test-fixtures.ts"

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
