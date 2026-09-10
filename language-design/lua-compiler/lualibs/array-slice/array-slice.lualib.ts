import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const arraySlice = {
  id: "01a081ed-ab46-73dd-ae99-208996ea044b",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-slice",
  definition: "the array of an array's elements between two indexes",
  code: "ts",
  luaExport: "__TS__ArraySlice",
} as const satisfies Lualib
