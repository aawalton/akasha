import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const sparseArrayNew = {
  id: "01a08c5d-b671-7825-8ff7-d2db4de03ac1",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "sparse-array-new",
  definition: "a sparse array built from arguments, holes and all",
  code: "ts",
  luaExport: "__TS__SparseArrayNew",
} as const satisfies Lualib
