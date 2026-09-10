import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const arrayToSpliced = {
  id: "01a081ed-ab46-76bb-afbb-558dddf8a9ef",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-to-spliced",
  definition: "the copy of an array with elements taken out at an index and others put in",
  code: "ts",
  luaExport: "__TS__ArrayToSpliced",
} as const satisfies Lualib
