import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const stringReplaceAll = {
  id: "01a081f7-142d-7377-a3c3-09c1aec2d6f6",
  type: "page-type/lualib-helper",
  slug: "string-replace-all",
  definition: "the text left once every match in it is replaced",
  code: "ts",
  luaExport: "__TS__StringReplaceAll",
} as const satisfies LualibHelper
