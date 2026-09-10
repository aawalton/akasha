import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const stringSlice = {
  id: "01a081f7-142d-797b-a071-2a09fc798b47",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "string-slice",
  definition: "the text between two indexes of other text",
  code: "ts",
  luaExport: "__TS__StringSlice",
} as const satisfies Lualib
