import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const stringEndsWith = {
  id: "01a081f7-142d-792b-9e9c-fc28d820ba0e",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "string-ends-with",
  definition: "the answer whether text ends with other text at a position",
  code: "ts",
  luaExport: "__TS__StringEndsWith",
} as const satisfies Lualib
