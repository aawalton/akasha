import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const mathSign = {
  id: "01a08c43-2cd8-7e1e-a5c8-b9d839026043",
  type: "page-type/lualib-helper",
  slug: "math-sign",
  definition: "minus one, zero or one, as a number is negative, zero or positive",
  code: "ts",
  luaExport: "__TS__MathSign",
  createdAt: "2026-09-10T17:00:07.768Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
