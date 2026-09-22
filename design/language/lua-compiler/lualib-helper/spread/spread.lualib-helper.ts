import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const spread = {
  id: "01a08202-0fa9-7648-bfce-6b6b15f45e44",
  type: "page-type/lualib-helper",
  slug: "spread",
  definition: "the many values out of text or an iterable",
  code: "ts",
  luaExport: "__TS__Spread",
} as const satisfies LualibHelper
