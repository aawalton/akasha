import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const decorate = {
  id: "01a08c47-693a-78d9-9a47-eae4e06a8a21",
  type: "page-type/lualib-helper",
  slug: "decorate",
  definition: "a value run through the decorators of the current proposal, last to first",
  code: "ts",
  luaExport: "__TS__Decorate",
} as const satisfies LualibHelper
