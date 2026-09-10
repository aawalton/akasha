import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change } from "../../../modules/scratch/check-scratch.module.code.ts"
import { noEnumOrNamespace } from "./no-enum-or-namespace.code-check.check.code.ts"
import { AT, rooted, scratch } from "./no-enum-or-namespace.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

const ENUM = "export enum Held {\n  One,\n}\n"

function judged(root: string, changed: readonly string[]): readonly Judged[] {
  const held = change(root, changed)
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return noEnumOrNamespace(held, cast.shadow)
}

test("an enum in a text the change carries is refused, and the refusal names that path", () => {
  const said = judged(rooted({ [AT]: ENUM }), [AT])
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("`enum Held`")
})

test("a path the change carries that is no text is not judged", () => {
  const at = "akasha/notes.txt"
  expect(judged(rooted({ [at]: ENUM }), [at])).toEqual([])
})
