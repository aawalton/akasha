import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const numberToString = {
  id: "01a08c49-7113-75cb-a65b-dd506c0d8957",
  type: "lualib",
  slug: "number-to-string",
  definition: "a number written out in a radix between two and thirty-six",
  code: "ts",
  luaExport: "__TS__NumberToString",
} as const satisfies Lualib
