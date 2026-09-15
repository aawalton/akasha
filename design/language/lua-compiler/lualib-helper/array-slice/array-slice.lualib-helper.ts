import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const arraySlice = {
  id: "01a081ed-ab46-73dd-ae99-208996ea044b",
  type: "page-type/lualib-helper",
  slug: "array-slice",
  definition: "the array of an array's elements between two indexes",
  code: "ts",
  luaExport: "__TS__ArraySlice",
} as const satisfies LualibHelper
