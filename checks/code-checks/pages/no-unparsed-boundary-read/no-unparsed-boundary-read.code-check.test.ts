import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change } from "../../../modules/scratch/check-scratch.module.code.ts"
import { noUnparsedBoundaryRead } from "./no-unparsed-boundary-read.code-check.code.ts"
import {
  AT,
  READ_AND_USED,
  rooted,
  scratch,
} from "./no-unparsed-boundary-read.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

function judged(root: string, changed: readonly string[]): readonly Judged[] {
  const held = change(root, changed)
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return noUnparsedBoundaryRead(held, cast.shadow)
}

test("an unparsed read in a text the change carries is refused, naming that path", () => {
  const said = judged(rooted({ [AT]: READ_AND_USED }), [AT])
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("json-parse")
})

test("a path the change carries that is no text is not judged", () => {
  const at = "checks/notes.txt"
  expect(judged(rooted({ [at]: READ_AND_USED }), [at])).toEqual([])
})
