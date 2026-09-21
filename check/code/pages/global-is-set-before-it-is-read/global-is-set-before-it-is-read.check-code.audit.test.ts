import { afterAll, expect, test } from "bun:test"
import { globalIsSetBeforeItIsRead } from "akasha/check/code/pages/global-is-set-before-it-is-read/global-is-set-before-it-is-read.check-code.audit.code.ts"
import {
  IMPORTS_SETTING,
  MAIN,
  MAIN_AT,
  READING,
  READING_AT,
  SETTING,
  SETTING_AT,
  scratch,
  tracked,
} from "akasha/check/code/pages/global-is-set-before-it-is-read/global-is-set-before-it-is-read.check-code.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("an audit refuses a reader no change names, because an audit reads every add-on whole", () => {
  const root = tracked({ [SETTING_AT]: SETTING, [READING_AT]: READING, [MAIN_AT]: MAIN })
  const said = globalIsSetBeforeItIsRead(root)
  expect(said.map((one) => one.path)).toEqual([READING_AT])
  expect(said[0]?.reason).toContain("`reading` reads `ONE_ARENA`, `ONE_DUNGEON`")
})

test("an audit lets through a tree whose every reader reaches its setter", () => {
  const reaching = `${IMPORTS_SETTING}\n${READING}`
  const root = tracked({ [SETTING_AT]: SETTING, [READING_AT]: reaching, [MAIN_AT]: MAIN })
  expect(globalIsSetBeforeItIsRead(root)).toEqual([])
})
