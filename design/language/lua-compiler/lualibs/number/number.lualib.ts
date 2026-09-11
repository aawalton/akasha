import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const number = {
  id: "01a08c40-ddab-77a8-a233-17540bb11717",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "number",
  definition: "the number a value of any type converts to",
  code: "ts",
  luaExport: "__TS__Number",
} as const satisfies Lualib
