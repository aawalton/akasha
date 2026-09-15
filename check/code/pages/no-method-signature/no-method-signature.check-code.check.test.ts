import { afterAll, expect, test } from "bun:test"
import { noMethodSignature } from "akasha/check/code/pages/no-method-signature/no-method-signature.check-code.check.code.ts"
import {
  AT,
  rooted,
  SIGNED,
  scratch,
} from "akasha/check/code/pages/no-method-signature/no-method-signature.check-code.decision.test-fixtures.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { change } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

function judged(root: string, changed: readonly string[]): readonly Judged[] {
  const held = change(root, changed)
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return noMethodSignature(held, cast.shadow)
}

test("a method signature in a text the change carries is refused, naming that path", () => {
  const said = judged(rooted({ [AT]: SIGNED }), [AT])
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("`at` as a method signature")
})

test("a path the change carries that is no text is not judged", () => {
  const at = "akasha/notes.txt"
  expect(judged(rooted({ [at]: SIGNED }), [at])).toEqual([])
})
