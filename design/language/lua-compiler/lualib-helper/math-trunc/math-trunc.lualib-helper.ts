import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const mathTrunc = {
  id: "01a08c42-c217-700a-bc11-3296673ba431",
  type: "page-type/lualib-helper",
  slug: "math-trunc",
  definition: "a number with its fractional part dropped, toward zero",
  code: "ts",
  luaExport: "__TS__MathTrunc",
  createdAt: "2026-09-10T16:59:40.439Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
