import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const stringReplace = {
  id: "01a081f7-142d-7014-911e-b09b75611eea",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "string-replace",
  definition: "the text left once the first match in it is written over",
  code: "ts",
  luaExport: "__TS__StringReplace",
} as const satisfies Lualib
