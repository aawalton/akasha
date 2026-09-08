import { expect, test } from "bun:test"
import { type LualibPage, sourcesFrom } from "./lualib-pages.module.code.ts"

const SCANNED = [
  "/lua-compiler/lualib/src/ArrayAt.ts",
  "/lua-compiler/lualib/src/ArrayConcat.ts",
  "/lua-compiler/lualib/src/universal/Unpack.ts",
  "/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts",
]

const ARRAY_AT: LualibPage = {
  pagePath: "/lua-compiler/lualibs/array-at/array-at.lualib.ts",
  luaExport: "__TS__ArrayAt",
  codePath: "/lua-compiler/lualibs/array-at/array-at.lualib.code.ts",
  lua50CodePath: null,
}

const UNPACK_LUA50 = "/lua-compiler/lualibs/unpack/unpack.lualib.lua50-code.ts"

const UNPACK: LualibPage = {
  pagePath: "/lua-compiler/lualibs/unpack/unpack.lualib.ts",
  luaExport: "Unpack",
  codePath: "/lua-compiler/lualibs/unpack/unpack.lualib.code.ts",
  lua50CodePath: UNPACK_LUA50,
}

test("no page at all answers with the scanned files themselves", () => {
  const held = sourcesFrom(SCANNED, [], false)
  expect(held.rootNames).toBe(SCANNED)
  expect(held.featureBySourceName.size).toBe(0)
})

test("a Lua export names its feature once the export's `__TS__` prefix is dropped", () => {
  expect(sourcesFrom(SCANNED, [ARRAY_AT], false).rootNames).toEqual([
    ARRAY_AT.codePath,
    "/lua-compiler/lualib/src/ArrayConcat.ts",
    "/lua-compiler/lualib/src/universal/Unpack.ts",
    "/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts",
  ])
})

test("a feature name is reached from the source file's name", () => {
  const held = sourcesFrom(SCANNED, [ARRAY_AT], false)
  expect(held.featureBySourceName.get("array-at.lualib.code")).toBe("ArrayAt")
})

test("a Lua export spelled in lower case names its feature", () => {
  const named: LualibPage = {
    pagePath: "/lua-compiler/lualibs/performance/performance.lualib.ts",
    luaExport: "performance",
    codePath: "/lua-compiler/lualibs/performance/performance.lualib.code.ts",
    lua50CodePath: null,
  }
  const held = sourcesFrom(SCANNED, [named], false)
  expect(held.featureBySourceName.get("performance.lualib.code")).toBe("Performance")
})

test("a build for Lua 5.0 takes a page's Lua 5.0 code where the page holds one", () => {
  const held = sourcesFrom(SCANNED, [UNPACK], true)
  expect(held.rootNames).toContain(UNPACK_LUA50)
  expect(held.featureBySourceName.get("unpack.lualib.lua50-code")).toBe("Unpack")
})

test("a build for Lua 5.0 of a page holding no Lua 5.0 code takes the page's code", () => {
  const held = sourcesFrom(SCANNED, [ARRAY_AT], true)
  expect(held.rootNames).toContain(ARRAY_AT.codePath)
})

test("a page naming no lualib feature either way refuses the build", () => {
  const named: LualibPage = {
    pagePath: "/lua-compiler/lualibs/nowhere/nowhere.lualib.ts",
    luaExport: "NotAFeature",
    codePath: "/lua-compiler/lualibs/nowhere/nowhere.lualib.code.ts",
    lua50CodePath: null,
  }
  expect(() => sourcesFrom(SCANNED, [named], false)).toThrow(
    'nowhere.lualib.ts states lua-export "NotAFeature", which names no lualib feature'
  )
})

test("a page naming a feature the scan found nowhere is added after what the scan found", () => {
  const named: LualibPage = {
    pagePath: "/lua-compiler/lualibs/await/await.lualib.ts",
    luaExport: "Await",
    codePath: "/lua-compiler/lualibs/await/await.lualib.code.ts",
    lua50CodePath: null,
  }
  const held = sourcesFrom(SCANNED, [named], false)
  expect(held.rootNames).toEqual([...SCANNED, named.codePath])
  expect(held.featureBySourceName.get("await.lualib.code")).toBe("Await")
})
