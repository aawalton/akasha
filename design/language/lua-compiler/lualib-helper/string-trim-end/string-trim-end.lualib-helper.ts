import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const stringTrimEnd = {
  id: "01a081ed-ab46-7c64-80b0-7dbaa3e6a3ad",
  type: "page-type/lualib-helper",
  slug: "string-trim-end",
  definition: "the text left once the whitespace at its end is taken away",
  code: "ts",
  luaExport: "__TS__StringTrimEnd",
  createdAt: "2026-09-08T16:50:31.878Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
