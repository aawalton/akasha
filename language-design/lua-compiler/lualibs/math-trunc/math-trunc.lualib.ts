import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const mathTrunc = {
  id: "01a08c42-c217-700a-bc11-3296673ba431",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "math-trunc",
  definition: "a number with its fractional part dropped, toward zero",
  code: "ts",
  luaExport: "__TS__MathTrunc",
} as const satisfies Lualib
