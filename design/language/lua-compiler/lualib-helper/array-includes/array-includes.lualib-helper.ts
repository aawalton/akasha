import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const arrayIncludes = {
  id: "01a081e7-49c9-701e-939a-16a07fdc0288",
  type: "page-type/lualib-helper",
  slug: "array-includes",
  definition: "the answer whether an array holds a value from an index onward",
  code: "ts",
  luaExport: "__TS__ArrayIncludes",
} as const satisfies LualibHelper
