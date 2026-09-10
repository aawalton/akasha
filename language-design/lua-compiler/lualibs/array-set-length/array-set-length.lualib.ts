import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const arraySetLength = {
  id: "01a081ed-ab46-7a25-b234-05b1e5225bb2",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-set-length",
  definition: "the length an array is set to, the elements past it dropped",
  code: "ts",
  luaExport: "__TS__ArraySetLength",
} as const satisfies Lualib
