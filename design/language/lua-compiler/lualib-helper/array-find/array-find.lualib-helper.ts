import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const arrayFind = {
  id: "01a081e7-49c9-7cb3-9938-3449e24ed867",
  type: "lualib-helper",
  slug: "array-find",
  definition: "the first element of an array that passes a test",
  code: "ts",
  luaExport: "__TS__ArrayFind",
} as const satisfies LualibHelper
