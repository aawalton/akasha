import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const stringTrimStart = {
  id: "01a081ed-ab46-7ba8-82b9-e28e41bb0f63",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "string-trim-start",
  definition: "the text left once the whitespace at its front is taken away",
  code: "ts",
  luaExport: "__TS__StringTrimStart",
} as const satisfies Lualib
