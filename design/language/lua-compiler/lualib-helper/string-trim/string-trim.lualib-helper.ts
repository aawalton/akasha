import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const stringTrim = {
  id: "01a081ed-ab46-7949-88e2-af34c0c84bcb",
  type: "page-type/lualib-helper",
  slug: "string-trim",
  definition: "the text left once the whitespace at both ends is taken away",
  code: "ts",
  luaExport: "__TS__StringTrim",
  createdAt: "2026-09-08T16:50:31.878Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
