import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const number = {
  id: "01a08c40-ddab-77a8-a233-17540bb11717",
  type: "lualib-helper",
  slug: "number",
  definition: "the number a value of any type converts to",
  code: "ts",
  luaExport: "__TS__Number",
} as const satisfies LualibHelper
