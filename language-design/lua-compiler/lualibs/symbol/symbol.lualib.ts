import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const symbol = {
  id: "01a081da-fded-7aea-81c2-ae80a9f08265",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "symbol",
  definition: "the unique value a description is wrapped into",
  code: "ts",
  luaExport: "__TS__Symbol",
} as const satisfies Lualib
