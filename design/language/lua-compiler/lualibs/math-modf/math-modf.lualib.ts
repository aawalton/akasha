import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const mathModf = {
  id: "01a08c49-057d-705b-a4e4-418f57839e94",
  type: "lualib",
  slug: "math-modf",
  definition: "a number split into its integral part and its fractional part",
  code: "ts",
  lua50Code: "ts",
  luaExport: "__TS__MathModf",
} as const satisfies Lualib
