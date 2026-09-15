import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const stringAccess = {
  id: "01a081ed-ab46-7df8-a8b5-2538b0a257df",
  type: "page-type/lualib-helper",
  slug: "string-access",
  definition: "the character text holds at an index, or nothing where the index is outside it",
  code: "ts",
  luaExport: "__TS__StringAccess",
} as const satisfies LualibHelper
