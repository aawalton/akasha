import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const newInstance = {
  id: "01a08c40-bd0b-7c60-bda5-568ac47df474",
  type: "page-type/lualib-helper",
  slug: "new-instance",
  definition: "the instance made by running a class's constructor",
  code: "ts",
  luaExport: "__TS__New",
} as const satisfies LualibHelper
