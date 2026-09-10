import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const countVarargs = {
  id: "01a08c5c-5e23-7b2a-8ca3-8dc69cdc7e92",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "count-varargs",
  definition: "how many arguments were passed, holes and all",
  code: "ts",
  lua50Code: "ts",
  luaExport: "__TS__CountVarargs",
} as const satisfies Lualib
