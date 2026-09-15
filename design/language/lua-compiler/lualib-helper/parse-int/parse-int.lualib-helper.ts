import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const parseInt = {
  id: "01a08c49-caaa-7f7b-a050-10afb3b61a14",
  type: "lualib-helper",
  slug: "parse-int",
  definition: "the whole number a string opens with, in a base read or given",
  code: "ts",
  luaExport: "__TS__ParseInt",
} as const satisfies LualibHelper
