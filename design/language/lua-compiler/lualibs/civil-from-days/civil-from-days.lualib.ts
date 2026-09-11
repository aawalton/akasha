import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const civilFromDays = {
  id: "01a09123-7278-7f5e-b815-7f73908d7620",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "civil-from-days",
  definition: "the year, month and day a count of days from the epoch reaches",
  code: "ts",
  luaExport: "__TS__CivilFromDays",
} as const satisfies Lualib
