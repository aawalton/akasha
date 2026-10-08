import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const civilFromDays = {
  id: "01a09123-7278-7f5e-b815-7f73908d7620",
  type: "page-type/lualib-helper",
  slug: "civil-from-days",
  definition: "the year, month and day a count of days from the epoch reaches",
  code: "ts",
  luaExport: "__TS__CivilFromDays",
  createdAt: "2026-09-11T15:43:34.520Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
