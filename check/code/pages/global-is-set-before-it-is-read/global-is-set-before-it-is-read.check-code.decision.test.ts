import { afterAll, expect, test } from "bun:test"
import {
  addonsIn,
  modulesOf,
} from "akasha/check/code/pages/global-is-set-before-it-is-read/global-is-set-before-it-is-read.check-code.decision.code.ts"
import {
  IMPORTS_MIDDLE,
  IMPORTS_OTHER,
  IMPORTS_SETTING,
  MAIN,
  MAIN_AT,
  MIDDLE_AT,
  OTHER_AT,
  pathsRefused,
  READING,
  READING_AT,
  READS_IN_A_FUNCTION,
  READS_LOOSE,
  READS_ROW,
  READS_SHOW,
  READS_TABLE,
  refused,
  refusedIn,
  SETS_IN_A_FUNCTION,
  SETS_ROWS,
  SETS_TABLE_BY_LITERAL,
  SETS_TABLE_BY_NAME,
  SETTING,
  SETTING_AT,
  SHOWS,
  scratch,
  world,
} from "akasha/check/code/pages/global-is-set-before-it-is-read/global-is-set-before-it-is-read.check-code.decision.test-fixtures.ts"
import { textIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

const NOT_REACHING =
  "`reading` reads `ONE_ARENA`, `ONE_DUNGEON`, which `setting` sets, and does not reach it as it loads"

test("a reader keying a table by globals a loop over string literals sets is refused where it does not reach the setter", () => {
  const said = refused({ [SETTING_AT]: SETTING, [READING_AT]: READING, [MAIN_AT]: MAIN })
  expect(said.map((one) => one.path)).toEqual([READING_AT])
  expect(said[0]?.reason).toStartWith(NOT_REACHING)
})

test("a reader importing the setter is not refused", () => {
  const reaching = `${IMPORTS_SETTING}\n${READING}`
  expect(pathsRefused({ [SETTING_AT]: SETTING, [READING_AT]: reaching, [MAIN_AT]: MAIN })).toEqual(
    []
  )
})

test("a name no module sets is not judged", () => {
  expect(
    pathsRefused({ [SETTING_AT]: SETTING, [READING_AT]: READS_LOOSE, [MAIN_AT]: MAIN })
  ).toEqual([])
})

test("a setter keyed by a loop over a runtime table cannot be traced, and sets nothing", () => {
  expect(
    pathsRefused({ [SETTING_AT]: SETS_ROWS, [READING_AT]: READS_ROW, [MAIN_AT]: MAIN })
  ).toEqual([])
})

test("a read inside a function body is not read at load", () => {
  expect(
    pathsRefused({ [SETTING_AT]: SETTING, [READING_AT]: READS_IN_A_FUNCTION, [MAIN_AT]: MAIN })
  ).toEqual([])
})

test("a bare assignment inside a function body sets its global when called, so it sets nothing here", () => {
  expect(
    pathsRefused({ [SETTING_AT]: SETS_IN_A_FUNCTION, [READING_AT]: READS_SHOW, [MAIN_AT]: MAIN })
  ).toEqual([])
})

test("a bare assignment at top level to a name the module binds nowhere sets that global", () => {
  const said = refused({ [SETTING_AT]: SHOWS, [READING_AT]: READS_SHOW, [MAIN_AT]: MAIN })
  expect(said.map((one) => one.path)).toEqual([READING_AT])
  expect(said[0]?.reason).toContain("reads `OneShow`, which `setting` sets")
})

test("a reader reaching one of two setters is in order", () => {
  expect(
    pathsRefused({
      [SETTING_AT]: SETS_TABLE_BY_LITERAL,
      [OTHER_AT]: SETS_TABLE_BY_NAME,
      [READING_AT]: `${IMPORTS_OTHER}\n${READS_TABLE}`,
      [MAIN_AT]: MAIN,
    })
  ).toEqual([])
})

test("a reader reaching neither of two setters is refused naming both", () => {
  const said = refused({
    [SETTING_AT]: SETS_TABLE_BY_LITERAL,
    [OTHER_AT]: SETS_TABLE_BY_NAME,
    [READING_AT]: READS_TABLE,
    [MAIN_AT]: MAIN,
  })
  expect(said.map((one) => one.path)).toEqual([READING_AT])
  expect(said[0]?.reason).toContain(
    "which `other` or `setting` sets, and does not reach either as it loads"
  )
})

test("a setter reached through another module is reached", () => {
  expect(
    pathsRefused({
      [SETTING_AT]: SETTING,
      [MIDDLE_AT]: IMPORTS_SETTING,
      [READING_AT]: `${IMPORTS_MIDDLE}\n${READING}`,
      [MAIN_AT]: MAIN,
    })
  ).toEqual([])
})

test("a module reaches itself", () => {
  const setsAndReads = `${SETTING}\nexport const first = ONE_ARENA\n`
  expect(pathsRefused({ [SETTING_AT]: setsAndReads, [MAIN_AT]: IMPORTS_SETTING })).toEqual([])
})

test("at change only a module the change has is refused", () => {
  const bodies = { [SETTING_AT]: SETTING, [READING_AT]: READING, [MAIN_AT]: MAIN }
  expect(refusedIn(bodies, [MAIN_AT])).toEqual([])
  expect(refusedIn(bodies, [READING_AT]).map((one) => one.path)).toEqual([READING_AT])
})

test("an add-on's own globals, its entry and the setters traced are read from its page and tree", () => {
  const held = world({ [SETTING_AT]: SETTING, [READING_AT]: READING, [MAIN_AT]: MAIN })
  const bodyAt = (path: string): string | null => textIn(held, path)
  const shadow = shadowAt(held.root)
  const addons = addonsIn(shadow, shadow.listed(), bodyAt)
  expect(addons).toHaveLength(1)
  const addon = addons[0]
  if (addon === undefined) throw new Error("no add-on was found")
  expect([...addon.declared].sort()).toEqual([
    "ONE_ARENA",
    "ONE_DUNGEON",
    "ONE_LOOSE",
    "ONE_ROW",
    "ONE_TABLE",
    "OneShow",
  ])
  expect(addon.entry).toBe(MAIN_AT)
  expect(addon.modules).toEqual([MAIN_AT, READING_AT, SETTING_AT])
  const modules = modulesOf(addon, bodyAt)
  expect(modules.map((one) => [one.path, one.reads, one.sets])).toEqual([
    [READING_AT, ["ONE_ARENA", "ONE_DUNGEON"], []],
    [SETTING_AT, [], ["ONE_ARENA", "ONE_DUNGEON"]],
  ])
})
