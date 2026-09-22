import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const arrayWith = {
  id: "01a081ed-ab46-7cf6-912a-dc2ec9cdd263",
  type: "page-type/lualib-helper",
  slug: "array-with",
  definition: "the copy of an array with another value at an index",
  code: "ts",
  luaExport: "__TS__ArrayWith",
} as const satisfies LualibHelper
