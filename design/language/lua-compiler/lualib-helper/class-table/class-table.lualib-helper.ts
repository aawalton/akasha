import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const classTable = {
  id: "01a08c40-9ab5-7019-9f24-03c398ac463b",
  type: "page-type/lualib-helper",
  slug: "class-table",
  definition: "the table a class is, with its prototype pointed at itself",
  code: "ts",
  luaExport: "__TS__Class",
} as const satisfies LualibHelper
