import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const json = {
  id: "01a08c56-1588-7ac1-89d9-5c505edc9573",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "json",
  definition: "a value written as JSON text and read back from it",
  code: "ts",
  luaExport: "JSON",
} as const satisfies Lualib
