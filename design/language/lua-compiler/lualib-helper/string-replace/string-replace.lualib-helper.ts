import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const stringReplace = {
  id: "01a081f7-142d-7014-911e-b09b75611eea",
  type: "page-type/lualib-helper",
  slug: "string-replace",
  definition: "the text left once the first match in it is replaced",
  code: "ts",
  luaExport: "__TS__StringReplace",
} as const satisfies LualibHelper
