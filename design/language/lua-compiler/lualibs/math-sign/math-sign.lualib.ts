import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const mathSign = {
  id: "01a08c43-2cd8-7e1e-a5c8-b9d839026043",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "math-sign",
  definition: "minus one, zero or one, as a number is negative, zero or positive",
  code: "ts",
  luaExport: "__TS__MathSign",
} as const satisfies Lualib
