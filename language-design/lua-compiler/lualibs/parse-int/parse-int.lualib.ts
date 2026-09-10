import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const parseInt = {
  id: "01a08c49-caaa-7f7b-a050-10afb3b61a14",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "parse-int",
  definition: "the whole number a string opens with, in a base read or given",
  code: "ts",
  luaExport: "__TS__ParseInt",
} as const satisfies Lualib
