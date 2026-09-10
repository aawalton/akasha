import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const setInterval = {
  id: "01a081d0-bc4d-77d2-8ca5-978dfe0e9f35",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "set-interval",
  definition: "the handle a call repeated on an interval is known by",
  code: "ts",
  luaExport: "__TS__SetInterval",
} as const satisfies Lualib
