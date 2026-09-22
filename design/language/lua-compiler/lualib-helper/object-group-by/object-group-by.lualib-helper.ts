import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const objectGroupBy = {
  id: "01a081f7-142d-7459-b18f-c91dd4ff0bad",
  type: "page-type/lualib-helper",
  slug: "object-group-by",
  definition: "the object holding items under each item's chosen key",
  code: "ts",
  luaExport: "__TS__ObjectGroupBy",
} as const satisfies LualibHelper
