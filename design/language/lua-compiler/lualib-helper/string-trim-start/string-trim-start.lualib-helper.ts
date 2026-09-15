import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const stringTrimStart = {
  id: "01a081ed-ab46-7ba8-82b9-e28e41bb0f63",
  type: "page-type/lualib-helper",
  slug: "string-trim-start",
  definition: "the text left once the whitespace at its front is taken away",
  code: "ts",
  luaExport: "__TS__StringTrimStart",
} as const satisfies LualibHelper
