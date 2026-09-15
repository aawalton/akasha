import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const arrayIndexOf = {
  id: "01a081ed-ab46-73fe-acfc-50f42a5e0313",
  type: "lualib-helper",
  slug: "array-index-of",
  definition: "the index an array first has a value at, from an index onward",
  code: "ts",
  luaExport: "__TS__ArrayIndexOf",
} as const satisfies LualibHelper
