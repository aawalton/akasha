import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const daysFromCivil = {
  id: "01a0911c-ce27-7d2d-904d-4b5f55ee2bb9",
  type: "page-type/lualib-helper",
  slug: "days-from-civil",
  definition: "the count of days from the epoch to a year, month and day",
  code: "ts",
  luaExport: "__TS__DaysFromCivil",
  createdAt: "2026-09-11T15:36:19.239Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
