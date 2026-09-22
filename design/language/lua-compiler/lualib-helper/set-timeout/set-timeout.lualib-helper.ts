import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const setTimeout = {
  id: "01a081d0-3e45-749c-b407-d15c7e134ff9",
  type: "page-type/lualib-helper",
  slug: "set-timeout",
  definition: "the handle of a call made once after a delay",
  code: "ts",
  luaExport: "__TS__SetTimeout",
} as const satisfies LualibHelper
