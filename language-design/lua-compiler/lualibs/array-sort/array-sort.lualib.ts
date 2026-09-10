import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const arraySort = {
  id: "01a081ed-ab46-7d88-a484-f5d1657a6c8f",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-sort",
  definition: "the array whose elements have been ordered by a comparison",
  code: "ts",
  luaExport: "__TS__ArraySort",
} as const satisfies Lualib
