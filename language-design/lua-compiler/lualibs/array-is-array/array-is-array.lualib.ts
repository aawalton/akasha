import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const arrayIsArray = {
  id: "01a081dd-c59d-70d7-88c8-5724f5705343",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-is-array",
  definition: "the answer whether a value is an array",
  code: "ts",
  luaExport: "__TS__ArrayIsArray",
} as const satisfies Lualib
