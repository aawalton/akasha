import { expect, test } from "bun:test"
import { type LualibPage, sourcesFrom } from "./lualib-pages.module.code.ts"

const SCANNED = [
  "/lua-compiler/lualib/src/ArrayAt.ts",
  "/lua-compiler/lualib/src/Nowhere.ts",
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
    "/lua-compiler/lualib/src/Nowhere.ts",
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

test("a scanned file that is a page's own code file is taken from the page instead", () => {
  const held = sourcesFrom([...SCANNED, ARRAY_AT.codePath], [ARRAY_AT], false)
  expect(held.rootNames.filter((one) => one === ARRAY_AT.codePath)).toHaveLength(1)
})

test("a build for Lua 5.0 passes over the scanned code file of a page holding Lua 5.0 code", () => {
  const held = sourcesFrom([...SCANNED, UNPACK.codePath], [UNPACK], true)
  expect(held.rootNames).not.toContain(UNPACK.codePath)
  expect(held.rootNames).toContain(UNPACK_LUA50)
})

test("two pages naming one lualib feature refuse the build", () => {
  const bare: LualibPage = {
    pagePath: "/lua-compiler/lualibs/well-known-symbols/well-known-symbols.lualib.ts",
    luaExport: "Symbol",
    codePath: "/lua-compiler/lualibs/well-known-symbols/well-known-symbols.lualib.code.ts",
    lua50CodePath: null,
  }
  const prefixed: LualibPage = {
    pagePath: "/lua-compiler/lualibs/symbol/symbol.lualib.ts",
    luaExport: "__TS__Symbol",
    codePath: "/lua-compiler/lualibs/symbol/symbol.lualib.code.ts",
    lua50CodePath: null,
  }
  expect(() => sourcesFrom(SCANNED, [bare, prefixed], false)).toThrow(
    'well-known-symbols.lualib.ts and /lua-compiler/lualibs/symbol/symbol.lualib.ts both name the lualib feature "Symbol"'
  )
})

test("a page naming no lualib feature either way refuses the build", () => {
  const named: LualibPage = {
    pagePath: "/lua-compiler/lualibs/nowhere/nowhere.lualib.ts",
    luaExport: "NotAFeature",
    codePath: "/lua-compiler/lualibs/nowhere/nowhere.lualib.code.ts",
    lua50CodePath: null,
  }
  expect(() => sourcesFrom(SCANNED, [named], false)).toThrow(
    'nowhere.lualib.ts names "NotAFeature", which names no lualib feature'
  )
})

test("a page's stated lua feature takes the place of the one its export names", () => {
  const named: LualibPage = {
    pagePath: "/lua-compiler/lualibs/well-known-symbols/well-known-symbols.lualib.ts",
    luaExport: "Symbol",
    luaFeature: "WellKnownSymbols",
    codePath: "/lua-compiler/lualibs/well-known-symbols/well-known-symbols.lualib.code.ts",
    lua50CodePath: null,
  }
  const held = sourcesFrom(SCANNED, [named], false)
  expect(held.featureBySourceName.get("well-known-symbols.lualib.code")).toBe("WellKnownSymbols")
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
