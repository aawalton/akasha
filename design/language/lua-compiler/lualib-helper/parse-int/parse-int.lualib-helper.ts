import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const parseInt = {
  id: "01a08c49-caaa-7f7b-a050-10afb3b61a14",
  type: "page-type/lualib-helper",
  slug: "parse-int",
  definition: "the whole number a string opens with, in a base read or given",
  code: "ts",
  luaExport: "__TS__ParseInt",
  createdAt: "2026-09-10T17:07:21.386Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
