import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const stringSplit = {
  id: "01a081f7-142d-7336-bfe2-51a723efcb7a",
  type: "lualib-helper",
  slug: "string-split",
  definition: "the array of the parts text falls into at a separator",
  code: "ts",
  luaExport: "__TS__StringSplit",
} as const satisfies LualibHelper
