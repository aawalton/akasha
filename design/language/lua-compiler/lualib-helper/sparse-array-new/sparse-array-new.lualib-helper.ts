import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const sparseArrayNew = {
  id: "01a08c5d-b671-7825-8ff7-d2db4de03ac1",
  type: "page-type/lualib-helper",
  slug: "sparse-array-new",
  definition: "a sparse array built from arguments, holes and all",
  code: "ts",
  luaExport: "__TS__SparseArrayNew",
} as const satisfies LualibHelper
