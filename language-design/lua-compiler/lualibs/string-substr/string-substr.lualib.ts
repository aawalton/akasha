import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const stringSubstr = {
  id: "01a081f7-142d-79a8-a7a4-9c1b402b6f79",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "string-substr",
  definition: "the text of a length taken from an index of other text",
  code: "ts",
  luaExport: "__TS__StringSubstr",
} as const satisfies Lualib
