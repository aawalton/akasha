import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const stringPadEnd = {
  id: "01a081f7-142d-7ea1-9f10-fca4909eb0ba",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "string-pad-end",
  definition: "the text filled out to a length with other text added at its end",
  code: "ts",
  luaExport: "__TS__StringPadEnd",
} as const satisfies Lualib
