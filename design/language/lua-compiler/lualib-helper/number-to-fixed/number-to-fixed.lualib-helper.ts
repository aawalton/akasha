import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const numberToFixed = {
  id: "01a08202-0fa9-795e-99f1-aa3a8b43c20d",
  type: "page-type/lualib-helper",
  slug: "number-to-fixed",
  definition: "the text a number takes with a stated count of fraction digits",
  code: "ts",
  luaExport: "__TS__NumberToFixed",
} as const satisfies LualibHelper
