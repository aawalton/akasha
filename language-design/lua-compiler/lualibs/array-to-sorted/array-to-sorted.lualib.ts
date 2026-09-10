import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const arrayToSorted = {
  id: "01a081ed-ab46-7684-93d9-9681ec02b9e9",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-to-sorted",
  definition: "the copy of an array with its elements ordered by a comparison",
  code: "ts",
  luaExport: "__TS__ArrayToSorted",
} as const satisfies Lualib
