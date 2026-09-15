import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const stringIncludes = {
  id: "01a081f7-142d-7c82-b6b1-3fafadcfc435",
  type: "lualib-helper",
  slug: "string-includes",
  definition: "the answer whether text holds other text from a position onward",
  code: "ts",
  luaExport: "__TS__StringIncludes",
} as const satisfies LualibHelper
