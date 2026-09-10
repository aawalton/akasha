import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const arrayFill = {
  id: "01a081e7-49c9-79ba-9141-c8f21ad2bc43",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-fill",
  definition: "the array one value has been written across a stretch of",
  code: "ts",
  luaExport: "__TS__ArrayFill",
} as const satisfies Lualib
