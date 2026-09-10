import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { landing } from "../../../modules/scratch/check-scratch.module.code.ts"
import { requireImportExtension } from "./require-import-extension.code-check.check.code.ts"
import {
  AT,
  BARE,
  NAMED,
  NAMED_AT,
  rooted,
  SPELLED,
  scratch,
} from "./require-import-extension.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

function judged(text: string): readonly Judged[] {
  const held = landing(rooted(), { [AT]: bytesOf(text), [NAMED_AT]: bytesOf(NAMED) })
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return requireImportExtension(held, cast.shadow)
}

test("the check refuses a specifier the change carries that names a file without its extension", () => {
  const said = judged(BARE)

  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("`./ledger.module.code`")
})

test("the check lets through a specifier carrying the extension of the file it names", () => {
  expect(judged(SPELLED)).toEqual([])
})

test("the check takes a body read as code as its input and no other body", () => {
  const held = landing(rooted(), { [AT]: bytesOf(SPELLED) })
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)

  expect(requireImportExtension.isInput(AT, cast.shadow)).toBe(true)
  expect(requireImportExtension.isInput("akasha/notes.txt", cast.shadow)).toBe(false)
})
