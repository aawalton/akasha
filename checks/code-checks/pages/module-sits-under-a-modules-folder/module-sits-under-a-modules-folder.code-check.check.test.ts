import { afterAll, expect, test } from "bun:test"
import { moduleSitsUnderAModulesFolder } from "akasha/checks/code-checks/pages/module-sits-under-a-modules-folder/module-sits-under-a-modules-folder.code-check.check.code.ts"
import {
  BODY,
  LOOSE_AT,
  NESTED_AT,
  rooted,
  scratch,
} from "akasha/checks/code-checks/pages/module-sits-under-a-modules-folder/module-sits-under-a-modules-folder.code-check.decision.test-fixtures.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { landing } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { shadowFor } from "akasha/pages/shadow/shadow.module.code.ts"
import { bytesOf } from "akasha/testing-system/modules/bodying/bodying.module.code.ts"

afterAll(scratch.sweep)

function judged(at: string): readonly Judged[] {
  const held = landing(rooted(), { [at]: bytesOf(BODY) })
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return moduleSitsUnderAModulesFolder(held, cast.shadow)
}

test("the check refuses a module page the change carries that sits under no `modules` folder", () => {
  const said = judged(LOOSE_AT)

  expect(said.map((one) => one.path)).toEqual([LOOSE_AT])
  expect(said[0]?.reason).toContain("`akasha/one/answering`")
})

test("the check lets through a module page the change carries under a `modules` folder", () => {
  expect(judged(NESTED_AT)).toEqual([])
})

test("the check takes a body read as code as its input and no other body", () => {
  const held = landing(rooted(), { [NESTED_AT]: bytesOf(BODY) })
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)

  expect(moduleSitsUnderAModulesFolder.isInput(NESTED_AT, cast.shadow)).toBe(true)
  expect(moduleSitsUnderAModulesFolder.isInput("akasha/notes.txt", cast.shadow)).toBe(false)
})
