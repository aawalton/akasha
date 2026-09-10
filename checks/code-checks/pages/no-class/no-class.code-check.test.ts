import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change } from "../../../modules/scratch/check-scratch.module.code.ts"
import { noClass } from "./no-class.code-check.code.ts"
import { AT, LIBRARY, rooted, scratch } from "./no-class.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

const CLASS = "export class Held {\n  one = 1\n}\n"

function judged(root: string, changed: readonly string[]): readonly Judged[] {
  const held = change(root, changed)
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return noClass(held, cast.shadow)
}

test("a class in a text the change carries is refused, and the refusal names that path", () => {
  const said = judged(rooted({ [AT]: CLASS }), [AT])
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("`class Held`")
})

test("a class under a runtime library the index files is let through", () => {
  const at = `${LIBRARY}src/Held.ts`
  expect(judged(rooted({ [at]: CLASS }), [at])).toEqual([])
})

test("a path the change carries that is no text is not judged", () => {
  const at = "akasha/notes.txt"
  expect(judged(rooted({ [at]: CLASS }), [at])).toEqual([])
})
