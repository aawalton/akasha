import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const arrayFlat = {
  id: "01a081e7-49c9-7570-867a-1c0a57761a6d",
  type: "page-type/lualib-helper",
  slug: "array-flat",
  definition: "the array an array's nested arrays are lifted into, down to a depth",
  code: "ts",
  luaExport: "__TS__ArrayFlat",
} as const satisfies LualibHelper
