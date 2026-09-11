import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const arrayFrom = {
  id: "01a08c60-b292-709d-ac40-f0c7ed5afe00",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-from",
  definition: "an array built from anything iterable or array-like",
  code: "ts",
  luaExport: "__TS__ArrayFrom",
} as const satisfies Lualib
