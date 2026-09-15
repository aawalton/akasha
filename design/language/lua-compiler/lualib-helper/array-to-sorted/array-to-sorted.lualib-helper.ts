import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const arrayToSorted = {
  id: "01a081ed-ab46-7684-93d9-9681ec02b9e9",
  type: "lualib-helper",
  slug: "array-to-sorted",
  definition: "the copy of an array with its elements ordered by a comparison",
  code: "ts",
  luaExport: "__TS__ArrayToSorted",
} as const satisfies LualibHelper
