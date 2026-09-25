import { expect, test } from "bun:test"
import {
  type Addon,
  BASE,
  reachedAmong,
} from "akasha/check/code/pages/lua-code-compiles/modules/addon-programs/addon-programs.module.code.ts"

const FOLDER = "held/addon"

const HELD: Addon = {
  page: `${FOLDER}/held.temper-addon.ts`,
  folder: FOLDER,
  name: "HeldAddon",
  manifest: `${FOLDER}/held.temper-addon.addon-manifest.json`,
  entrySlug: "module/held-entry",
  entry: "held/elsewhere/held-entry/held-entry.module.code.ts",
  reached: ["held/core"],
  declaring: ["held/eso"],
}

function reaches(path: string): boolean {
  return reachedAmong([HELD], [path]).length === 1
}

test("an addon is reached through its page, its manifest and its bundle entry", () => {
  expect(reaches(HELD.page)).toBe(true)
  expect(reaches(HELD.manifest)).toBe(true)
  expect(reaches(HELD.entry ?? "")).toBe(true)
})

test("an addon is reached through every file its settings include", () => {
  expect(reaches(`${FOLDER}/modules/one/one.module.code.ts`)).toBe(true)
  expect(reaches(`${FOLDER}/game/game.type-declaration.d.ts`)).toBe(true)
  expect(reaches("held/core/core-globals.d.ts")).toBe(true)
  expect(reaches("held/eso/api/api.type-declaration.d.ts")).toBe(true)
})

test("the base config every addon's settings extend reaches every addon", () => {
  expect(reaches(BASE)).toBe(true)
})

test("a file no setting includes reaches no addon by itself", () => {
  expect(reaches("held/elsewhere/filter/filter.module.code.ts")).toBe(false)
  expect(reaches("held/core/core.module.code.ts")).toBe(false)
  expect(reaches("held/eso/api/api.d.ts")).toBe(false)
  expect(reaches(`${FOLDER}/art/icon.dds`)).toBe(false)
})

test("a change reaching no addon names none", () => {
  expect(reachedAmong([HELD], [])).toEqual([])
})
