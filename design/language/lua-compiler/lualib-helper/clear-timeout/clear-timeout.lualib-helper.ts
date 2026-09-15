import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const clearTimeout = {
  id: "01a081d0-6ee0-7c98-98ce-5974b65ef70b",
  type: "page-type/lualib-helper",
  slug: "clear-timeout",
  definition: "the cancelling a delayed call is given by its handle",
  code: "ts",
  luaExport: "__TS__ClearTimeout",
} as const satisfies LualibHelper
