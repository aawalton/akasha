import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const stringCharCodeAt = {
  id: "01a081e7-49c9-7483-8702-12cf5959cc4f",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "string-char-code-at",
  definition: "the code of the character text holds at an index",
  code: "ts",
  luaExport: "__TS__StringCharCodeAt",
} as const satisfies Lualib
