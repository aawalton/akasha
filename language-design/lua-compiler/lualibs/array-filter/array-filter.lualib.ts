import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const arrayFilter = {
  id: "01a081e7-49c9-75a8-8305-399f0c7bbdf0",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-filter",
  definition: "the array with each element of an array that passes a test",
  code: "ts",
  luaExport: "__TS__ArrayFilter",
} as const satisfies Lualib
