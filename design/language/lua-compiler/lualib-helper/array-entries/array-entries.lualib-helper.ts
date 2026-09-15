import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const arrayEntries = {
  id: "01a081de-1f79-775e-86d8-21783c2349a9",
  type: "lualib-helper",
  slug: "array-entries",
  definition: "the iterator over an array's index and element pairs",
  code: "ts",
  luaExport: "__TS__ArrayEntries",
} as const satisfies LualibHelper
