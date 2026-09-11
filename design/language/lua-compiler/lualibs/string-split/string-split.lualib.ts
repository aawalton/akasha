import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const stringSplit = {
  id: "01a081f7-142d-7336-bfe2-51a723efcb7a",
  type: "lualib",
  slug: "string-split",
  definition: "the array of the parts text falls into at a separator",
  code: "ts",
  luaExport: "__TS__StringSplit",
} as const satisfies Lualib
