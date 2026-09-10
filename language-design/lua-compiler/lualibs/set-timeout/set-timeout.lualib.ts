import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const setTimeout = {
  id: "01a081d0-3e45-749c-b407-d15c7e134ff9",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "set-timeout",
  definition: "the handle a call made once after a delay is known by",
  code: "ts",
  luaExport: "__TS__SetTimeout",
} as const satisfies Lualib
