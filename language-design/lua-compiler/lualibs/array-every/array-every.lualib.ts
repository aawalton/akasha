import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const arrayEvery = {
  id: "01a081e7-49c9-711c-90e3-bc051dc66c4f",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-every",
  definition: "the answer whether every element of an array passes a test",
  code: "ts",
  luaExport: "__TS__ArrayEvery",
} as const satisfies Lualib
