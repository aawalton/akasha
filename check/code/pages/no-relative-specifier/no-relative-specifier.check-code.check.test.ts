import { afterAll, expect, test } from "bun:test"
import { noRelativeSpecifier } from "akasha/check/code/pages/no-relative-specifier/no-relative-specifier.check-code.check.code.ts"
import {
  AT,
  BESIDE,
  NAMED,
  NAMED_AT,
  ROOTED,
  rooted,
  scratch,
} from "akasha/check/code/pages/no-relative-specifier/no-relative-specifier.check-code.decision.test-fixtures.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { landing } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { bytesOf } from "akasha/check/test/modules/bodying/bodying.module.code.ts"

afterAll(scratch.sweep)

function judged(text: string): readonly Judged[] {
  const held = landing(rooted(), { [AT]: bytesOf(text), [NAMED_AT]: bytesOf(NAMED) })
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return noRelativeSpecifier(held, cast.shadow)
}

test("the check refuses a specifier the change carries that names a file by a relative path", () => {
  const said = judged(BESIDE)

  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("`./ledger.module.code.ts`")
})

test("the check lets through a specifier spelled from the root package", () => {
  expect(judged(ROOTED)).toEqual([])
})

test("the check takes a body read as code as its input and no other body", () => {
  const held = landing(rooted(), { [AT]: bytesOf(ROOTED) })
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)

  expect(noRelativeSpecifier.isInput(AT, cast.shadow)).toBe(true)
  expect(noRelativeSpecifier.isInput("akasha/notes.txt", cast.shadow)).toBe(false)
})
