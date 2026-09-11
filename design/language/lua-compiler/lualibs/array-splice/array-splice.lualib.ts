import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const arraySplice = {
  id: "01a08c5e-5535-7500-b9e2-1574322d0905",
  type: "lualib",
  slug: "array-splice",
  definition: "elements taken out of an array and others put where they were",
  code: "ts",
  luaExport: "__TS__ArraySplice",
} as const satisfies Lualib
