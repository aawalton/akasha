import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const clearInterval = {
  id: "01a081d0-f23b-7f54-9a5f-1793378c6dfc",
  type: "page-type/lualib-helper",
  slug: "clear-interval",
  definition: "the unregistering a repeated call is given by its handle",
  code: "ts",
  luaExport: "__TS__ClearInterval",
} as const satisfies LualibHelper
