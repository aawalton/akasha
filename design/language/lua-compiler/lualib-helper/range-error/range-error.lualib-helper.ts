import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const rangeError = {
  id: "01a081c0-a51d-7578-9bf4-2ff629d6f775",
  type: "page-type/lualib-helper",
  slug: "range-error",
  definition: "the error type a value outside its allowed range is",
  code: "ts",
  luaExport: "RangeError",
  createdAt: "2026-09-08T16:01:21.181Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
