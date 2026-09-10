import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const luaIteratorSpread = {
  id: "01a081f7-142d-71c5-bd71-a8946abb6106",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "lua-iterator-spread",
  definition: "the key and value pairs a Lua iterator answers, spread as many values",
  code: "ts",
  luaExport: "__TS__LuaIteratorSpread",
} as const satisfies Lualib
