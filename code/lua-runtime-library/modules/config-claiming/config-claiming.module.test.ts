import { expect, test } from "bun:test"
import { join } from "node:path"
import {
  claimingOver,
  matching,
} from "akasha/code/lua-runtime-library/modules/config-claiming/config-claiming.module.code.ts"
import { textThere } from "akasha/file/system/modules/text-there/text-there.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const ROOT = join(import.meta.dir, "../../../..")

const LUA = "design/language/lua-compiler"

const MOVED = "moved/held.lua-runtime-library.ts"

const MOVED_CONFIG = "moved/tsconfig.json"

function onDisk(path: string): string | null {
  return textThere(join(ROOT, path))
}

function movedOnly(path: string): string | null {
  if (path === MOVED) return "export const held = {}\n"
  if (path === MOVED_CONFIG) return '{ "include": ["src/*.ts"] }\n'
  return null
}

test("what a config's include names is read as a pattern rather than as plain text", () => {
  expect(matching("a/src/*.ts").test("a/src/one.ts")).toBe(true)
  expect(matching("a/src/*.ts").test("a/src/deep/one.ts")).toBe(false)
  expect(matching("a/src/**/*.ts").test("a/src/deep/one.ts")).toBe(true)
  expect(matching("a/one.d.ts").test("a/oneXd.ts")).toBe(false)
})

test("a file a library's config names is claimed, read against the folder that config sits in", () => {
  const claimed = claimingOver([], onDisk, shadowAt(ROOT).index)
  expect(claimed(`${LUA}/lualib-helper/whatever/whatever.lualib-helper.code.ts`)).toBe(true)
  expect(claimed(`${LUA}/sparse-array/sparse-array.type-declaration.d.ts`)).toBe(true)
  expect(claimed(`${LUA}/modules/scope/scope.module.code.ts`)).toBe(false)
})

test("a library the change moves is found where the change leaves it", () => {
  const claimed = claimingOver([MOVED], movedOnly, shadowAt(ROOT).index)
  expect(claimed("moved/src/one.ts")).toBe(true)
  expect(claimed("moved/one.ts")).toBe(false)
})
