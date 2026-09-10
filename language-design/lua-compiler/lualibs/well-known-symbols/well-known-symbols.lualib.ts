import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const wellKnownSymbols = {
  id: "01a081db-2ced-7614-92db-92bfeaaf71f8",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "well-known-symbols",
  definition: "the symbols the language itself names",
  code: "ts",
  luaExport: "Symbol",
  luaFeature: "WellKnownSymbols",
} as const satisfies Lualib
