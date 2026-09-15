import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const functionBind = {
  id: "01a081f7-142d-77df-a909-6f5bff7f4aea",
  type: "lualib-helper",
  slug: "function-bind",
  definition: "the function calling another with arguments already given to it",
  code: "ts",
  luaExport: "__TS__FunctionBind",
} as const satisfies LualibHelper
