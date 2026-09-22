import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const setInterval = {
  id: "01a081d0-bc4d-77d2-8ca5-978dfe0e9f35",
  type: "page-type/lualib-helper",
  slug: "set-interval",
  definition: "the handle of a call repeated on an interval",
  code: "ts",
  luaExport: "__TS__SetInterval",
} as const satisfies LualibHelper
