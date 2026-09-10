import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const stringReplaceAll = {
  id: "01a081f7-142d-7377-a3c3-09c1aec2d6f6",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "string-replace-all",
  definition: "the text left once every match in it is written over",
  code: "ts",
  luaExport: "__TS__StringReplaceAll",
} as const satisfies Lualib
