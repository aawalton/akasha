import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const date = {
  id: "01a08c52-6f66-752d-87a3-b4c91c649047",
  type: "lualib",
  slug: "date",
  definition: "a moment held as milliseconds since the epoch",
  code: "ts",
  luaExport: "Date",
} as const satisfies Lualib
