import { expect, test } from "bun:test"
import {
  type LualibPage,
  sourcesFrom,
} from "akasha/language-design/lua-compiler/lualib-pages/lualib-pages.module.code.ts"
import {
  ARRAY_AT_CODE,
  ARRAY_AT_PAGE,
  PERFORMANCE_CODE,
  PERFORMANCE_PAGE,
  SANDBOX,
  SYMBOL_CODE,
  SYMBOL_PAGE,
  UNPACK_CODE,
  UNPACK_LUA50,
  UNPACK_PAGE,
  WELL_KNOWN_CODE,
  WELL_KNOWN_PAGE,
} from "akasha/language-design/lua-compiler/lualib-pages/lualib-pages.module.test-fixtures.ts"

const SCANNED = [
  "/lua-compiler/lualib/src/ArrayAt.ts",
  "/lua-compiler/lualib/src/Nowhere.ts",
  "/lua-compiler/lualib/src/universal/Unpack.ts",
  SANDBOX,
]

const ARRAY_AT: LualibPage = {
  pagePath: ARRAY_AT_PAGE,
  luaExport: "__TS__ArrayAt",
  codePath: ARRAY_AT_CODE,
  lua50CodePath: null,
}

const UNPACK: LualibPage = {
  pagePath: UNPACK_PAGE,
  luaExport: "Unpack",
  codePath: UNPACK_CODE,
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
    SANDBOX,
  ])
})

test("a feature name is reached from the source file's name", () => {
  const held = sourcesFrom(SCANNED, [ARRAY_AT], false)
  expect(held.featureBySourceName.get("array-at.lualib.code")).toBe("ArrayAt")
})

test("a Lua export spelled in lower case names its feature", () => {
  const named: LualibPage = {
    pagePath: PERFORMANCE_PAGE,
    luaExport: "performance",
    codePath: PERFORMANCE_CODE,
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

test("a build for Lua 5.0 takes a page's Lua 5.0 code in place of that page's code", () => {
  const held = sourcesFrom(SCANNED, [UNPACK], true)
  expect(held.takenInstead.get(UNPACK.codePath)).toBe(UNPACK_LUA50)
})

test("a build that is not for Lua 5.0 takes no file in place of another", () => {
  const held = sourcesFrom(SCANNED, [UNPACK], false)
  expect(held.takenInstead.size).toBe(0)
})

test("a page holding no Lua 5.0 code has no file taken in place of its code", () => {
  const held = sourcesFrom(SCANNED, [ARRAY_AT], true)
  expect(held.takenInstead.size).toBe(0)
})

test("an import naming the code of a page holding Lua 5.0 code names that page's feature", () => {
  const held = sourcesFrom(SCANNED, [UNPACK], true)
  expect(held.featureBySourceName.get("unpack.lualib.code")).toBe("Unpack")
})

test("two pages naming one lualib feature refuse the build", () => {
  const bare: LualibPage = {
    pagePath: WELL_KNOWN_PAGE,
    luaExport: "Symbol",
    codePath: WELL_KNOWN_CODE,
    lua50CodePath: null,
  }
  const prefixed: LualibPage = {
    pagePath: SYMBOL_PAGE,
    luaExport: "__TS__Symbol",
    codePath: SYMBOL_CODE,
    lua50CodePath: null,
  }
  expect(() => sourcesFrom(SCANNED, [bare, prefixed], false)).toThrow(
    `well-known-symbols.lualib.ts and ${SYMBOL_PAGE} both name the lualib feature "Symbol"`
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
    pagePath: WELL_KNOWN_PAGE,
    luaExport: "Symbol",
    luaFeature: "WellKnownSymbols",
    codePath: WELL_KNOWN_CODE,
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
