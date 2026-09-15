import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const arrayFrom = {
  id: "01a08c60-b292-709d-ac40-f0c7ed5afe00",
  type: "page-type/lualib-helper",
  slug: "array-from",
  definition: "an array built from anything iterable or array-like",
  code: "ts",
  luaExport: "__TS__ArrayFrom",
} as const satisfies LualibHelper
