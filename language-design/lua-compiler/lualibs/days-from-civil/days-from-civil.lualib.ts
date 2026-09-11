import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const daysFromCivil = {
  id: "01a0911c-ce27-7d2d-904d-4b5f55ee2bb9",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "days-from-civil",
  definition: "the count of days from the epoch to a year, month and day",
  code: "ts",
  luaExport: "__TS__DaysFromCivil",
} as const satisfies Lualib
