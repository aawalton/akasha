import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const arrayFindIndex = {
  id: "01a081e7-49c9-791c-8ef9-3a58dbe09f1a",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-find-index",
  definition: "the index of the first element of an array that passes a test",
  code: "ts",
  luaExport: "__TS__ArrayFindIndex",
} as const satisfies Lualib
