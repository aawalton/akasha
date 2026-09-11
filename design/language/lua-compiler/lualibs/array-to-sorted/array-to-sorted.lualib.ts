import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const arrayToSorted = {
  id: "01a081ed-ab46-7684-93d9-9681ec02b9e9",
  type: "lualib",
  slug: "array-to-sorted",
  definition: "the copy of an array with its elements ordered by a comparison",
  code: "ts",
  luaExport: "__TS__ArrayToSorted",
} as const satisfies Lualib
