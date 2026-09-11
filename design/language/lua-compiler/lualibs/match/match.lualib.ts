import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const match = {
  id: "01a08c49-3797-73d9-806a-55f3cdc5bfe9",
  type: "lualib",
  slug: "match",
  definition: "the captures a Lua pattern takes from a string, or the whole match where none",
  code: "ts",
  lua50Code: "ts",
  luaExport: "__TS__Match",
} as const satisfies Lualib
