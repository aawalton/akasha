import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const daysFromCivil = {
  id: "01a0911c-ce27-7d2d-904d-4b5f55ee2bb9",
  type: "page-type/lualib-helper",
  slug: "days-from-civil",
  definition: "the count of days from the epoch to a year, month and day",
  code: "ts",
  luaExport: "__TS__DaysFromCivil",
} as const satisfies LualibHelper
