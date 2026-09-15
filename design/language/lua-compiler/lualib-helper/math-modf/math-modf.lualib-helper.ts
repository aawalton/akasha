import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const mathModf = {
  id: "01a08c49-057d-705b-a4e4-418f57839e94",
  type: "page-type/lualib-helper",
  slug: "math-modf",
  definition: "a number split into its integral part and its fractional part",
  code: "ts",
  lua50Code: "ts",
  luaExport: "__TS__MathModf",
} as const satisfies LualibHelper
