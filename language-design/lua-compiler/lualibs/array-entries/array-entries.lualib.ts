import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const arrayEntries = {
  id: "01a081de-1f79-775e-86d8-21783c2349a9",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-entries",
  definition: "the iterator over an array's index and element pairs",
  code: "ts",
  luaExport: "__TS__ArrayEntries",
} as const satisfies Lualib
