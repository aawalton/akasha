import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const awaiting = {
  id: "01a081c8-3b7c-70de-af0f-be32ed7a811e",
  type: "page-type/lualib-helper",
  slug: "awaiting",
  definition: "the yield an await expression becomes",
  code: "ts",
  luaExport: "__TS__Await",
} as const satisfies LualibHelper
