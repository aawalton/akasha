import type { Lualib } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const rangeError = {
  id: "01a081c0-a51d-7578-9bf4-2ff629d6f775",
  type: "lualib",
  slug: "range-error",
  definition: "the error type a value outside its allowed range is",
  code: "ts",
  luaExport: "RangeError",
} as const satisfies Lualib
