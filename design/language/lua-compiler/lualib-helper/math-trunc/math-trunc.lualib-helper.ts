import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const mathTrunc = {
  id: "01a08c42-c217-700a-bc11-3296673ba431",
  type: "lualib-helper",
  slug: "math-trunc",
  definition: "a number with its fractional part dropped, toward zero",
  code: "ts",
  luaExport: "__TS__MathTrunc",
} as const satisfies LualibHelper
