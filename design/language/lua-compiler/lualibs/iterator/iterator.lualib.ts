import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const iterator = {
  id: "01a08c60-3d0c-7988-98c7-0604fc418e4e",
  type: "lualib",
  slug: "iterator",
  definition: "anything iterable stepped through one value at a time",
  code: "ts",
  luaExport: "__TS__Iterator",
} as const satisfies Lualib
