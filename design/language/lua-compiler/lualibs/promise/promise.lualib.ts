import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const promise = {
  id: "01a08c58-49af-7d12-a4b4-1d6159d1f701",
  type: "lualib",
  slug: "promise",
  definition: "a value that arrives later, or the reason it never will",
  code: "ts",
  luaExport: "__TS__Promise",
} as const satisfies Lualib
