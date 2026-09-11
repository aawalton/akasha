import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const arrayReduce = {
  id: "01a08c5d-474b-71b6-9162-53f4eafc4ae4",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-reduce",
  definition: "an array folded from its start into one value",
  code: "ts",
  luaExport: "__TS__ArrayReduce",
} as const satisfies Lualib
