import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const arraySetLength = {
  id: "01a081ed-ab46-7a25-b234-05b1e5225bb2",
  type: "lualib-helper",
  slug: "array-set-length",
  definition: "the length an array is set to, the elements past it dropped",
  code: "ts",
  luaExport: "__TS__ArraySetLength",
} as const satisfies LualibHelper
