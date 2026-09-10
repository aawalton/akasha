import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const stringTrimEnd = {
  id: "01a081ed-ab46-7c64-80b0-7dbaa3e6a3ad",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "string-trim-end",
  definition: "the text left once the whitespace at its end is taken away",
  code: "ts",
  luaExport: "__TS__StringTrimEnd",
} as const satisfies Lualib
