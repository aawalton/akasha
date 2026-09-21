import { afterAll, expect, test } from "bun:test"
import {
  globalIsSetBeforeItIsRead,
  underAddon,
} from "akasha/check/code/pages/global-is-set-before-it-is-read/global-is-set-before-it-is-read.check-code.check.code.ts"
import {
  ADDON_AT,
  IMPORTS_SETTING,
  MAIN,
  MAIN_AT,
  OUTSIDE_AT,
  patched,
  READING,
  READING_AT,
  SETTING,
  SETTING_AT,
  scratch,
} from "akasha/check/code/pages/global-is-set-before-it-is-read/global-is-set-before-it-is-read.check-code.decision.test-fixtures.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { shadowAsked } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

const REACHING = `${IMPORTS_SETTING}\n${READING}`

const IN_ORDER = { [SETTING_AT]: SETTING, [READING_AT]: REACHING, [MAIN_AT]: MAIN }

const OUT_OF_ORDER = { [SETTING_AT]: SETTING, [READING_AT]: READING, [MAIN_AT]: MAIN }

function judged(held: Change): readonly Judged[] {
  return globalIsSetBeforeItIsRead(held, shadowAsked(held))
}

test("a change writing a reader that does not reach the setter is refused through the check", () => {
  expect(judged(patched(IN_ORDER, { [READING_AT]: READING })).map((one) => one.path)).toEqual([
    READING_AT,
  ])
})

test("a change writing only the entry is refused nothing though a reader is out of order", () => {
  expect(judged(patched(OUT_OF_ORDER, { [MAIN_AT]: `${MAIN}\n` }))).toEqual([])
})

test("a change writing a reader that reaches the setter is let through", () => {
  expect(judged(patched(OUT_OF_ORDER, { [READING_AT]: REACHING }))).toEqual([])
})

test("TypeScript under an add-on's tree is input to this check, and TypeScript elsewhere is not", () => {
  const shadow = shadowAsked(patched({ [SETTING_AT]: SETTING, [MAIN_AT]: IMPORTS_SETTING }, {}))
  expect(underAddon(READING_AT, shadow)).toBe(true)
  expect(underAddon(ADDON_AT, shadow)).toBe(true)
  expect(underAddon(OUTSIDE_AT, shadow)).toBe(false)
})
