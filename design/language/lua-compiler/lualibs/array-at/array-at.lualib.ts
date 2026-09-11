import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const arrayAt = {
  id: "01a08192-f89b-7ad0-9aaf-f96bcd61a6be",
  type: "lualib",
  slug: "array-at",
  definition: "the element an index counted from either end of an array reaches",
  code: "ts",
  luaExport: "__TS__ArrayAt",
} as const satisfies Lualib
