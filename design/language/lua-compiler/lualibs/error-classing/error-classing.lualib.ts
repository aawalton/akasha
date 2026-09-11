import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const errorClassing = {
  id: "01a081c0-4cb5-7f8d-852a-c34c9066562e",
  type: "lualib",
  slug: "error-classing",
  definition: "the name and the call an error type is given",
  code: "ts",
  luaExport: "__TS__ErrorClassing",
} as const satisfies Lualib
