import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const stringPadStart = {
  id: "01a081f7-142d-7a13-8bc8-1291865192a2",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "string-pad-start",
  definition: "the text filled out to a length with other text added at its front",
  code: "ts",
  luaExport: "__TS__StringPadStart",
} as const satisfies Lualib
