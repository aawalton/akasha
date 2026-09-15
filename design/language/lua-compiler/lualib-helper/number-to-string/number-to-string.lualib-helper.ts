import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const numberToString = {
  id: "01a08c49-7113-75cb-a65b-dd506c0d8957",
  type: "page-type/lualib-helper",
  slug: "number-to-string",
  definition: "a number written out in a radix between two and thirty-six",
  code: "ts",
  luaExport: "__TS__NumberToString",
} as const satisfies LualibHelper
