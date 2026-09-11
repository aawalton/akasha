import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const arrayWith = {
  id: "01a081ed-ab46-7cf6-912a-dc2ec9cdd263",
  type: "lualib",
  slug: "array-with",
  definition: "the copy of an array with another value at one index",
  code: "ts",
  luaExport: "__TS__ArrayWith",
} as const satisfies Lualib
