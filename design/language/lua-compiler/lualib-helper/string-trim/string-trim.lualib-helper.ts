import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const stringTrim = {
  id: "01a081ed-ab46-7949-88e2-af34c0c84bcb",
  type: "lualib-helper",
  slug: "string-trim",
  definition: "the text left once the whitespace at both ends is taken away",
  code: "ts",
  luaExport: "__TS__StringTrim",
} as const satisfies LualibHelper
