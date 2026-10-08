import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const clearInterval = {
  id: "01a081d0-f23b-7f54-9a5f-1793378c6dfc",
  type: "page-type/lualib-helper",
  slug: "clear-interval",
  definition: "the unregistering a repeated call is given by its handle",
  code: "ts",
  luaExport: "__TS__ClearInterval",
  createdAt: "2026-09-08T16:19:09.499Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
