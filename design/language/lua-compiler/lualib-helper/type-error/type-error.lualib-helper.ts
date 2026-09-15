import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const typeError = {
  id: "01a081c1-248a-7ace-a8b5-cf9b46fad562",
  type: "lualib-helper",
  slug: "type-error",
  definition: "the error type a value of the wrong type is",
  code: "ts",
  luaExport: "TypeError",
} as const satisfies LualibHelper
