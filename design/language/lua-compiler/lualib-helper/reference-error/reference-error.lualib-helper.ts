import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const referenceError = {
  id: "01a081c0-cd99-742a-abe0-4add7789e920",
  type: "page-type/lualib-helper",
  slug: "reference-error",
  definition: "the error type a name reaching nothing is",
  code: "ts",
  luaExport: "ReferenceError",
} as const satisfies LualibHelper
