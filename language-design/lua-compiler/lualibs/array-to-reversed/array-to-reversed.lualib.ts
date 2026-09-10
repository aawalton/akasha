import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const arrayToReversed = {
  id: "01a081ed-ab46-7ec8-aeaf-6eb0c7270e84",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-to-reversed",
  definition: "the copy of an array with its elements in the opposite order",
  code: "ts",
  luaExport: "__TS__ArrayToReversed",
} as const satisfies Lualib
