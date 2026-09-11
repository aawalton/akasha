import { afterAll, expect, test } from "bun:test"
import { noEnumOrNamespace } from "akasha/checks/code-checks/pages/no-enum-or-namespace/no-enum-or-namespace.code-check.check.code.ts"
import {
  AT,
  rooted,
  scratch,
} from "akasha/checks/code-checks/pages/no-enum-or-namespace/no-enum-or-namespace.code-check.decision.test-fixtures.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { change } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { shadowFor } from "akasha/pages/shadow/shadow.module.code.ts"

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
