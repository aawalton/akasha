import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const sparseArrayPush = {
  id: "01a08c5d-e1bd-78e5-99e7-c557a225efa6",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "sparse-array-push",
  definition: "arguments added to the end of a sparse array, holes and all",
  code: "ts",
  luaExport: "__TS__SparseArrayPush",
} as const satisfies Lualib
