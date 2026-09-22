import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const mapGroupBy = {
  id: "01a08202-0fa9-7a37-9767-374c19eaea36",
  type: "page-type/lualib-helper",
  slug: "map-group-by",
  definition: "the map holding items under each item's chosen key",
  code: "ts",
  luaExport: "__TS__MapGroupBy",
} as const satisfies LualibHelper
