import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const arrayFill = {
  id: "01a081e7-49c9-79ba-9141-c8f21ad2bc43",
  type: "page-type/lualib-helper",
  slug: "array-fill",
  definition: "the array a value has been written across a stretch of",
  code: "ts",
  luaExport: "__TS__ArrayFill",
} as const satisfies LualibHelper
