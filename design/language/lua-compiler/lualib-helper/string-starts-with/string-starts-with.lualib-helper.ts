import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const stringStartsWith = {
  id: "01a081f7-142d-744c-9e42-373864d7631f",
  type: "page-type/lualib-helper",
  slug: "string-starts-with",
  definition: "the answer whether text starts with other text at a position",
  code: "ts",
  luaExport: "__TS__StringStartsWith",
} as const satisfies LualibHelper
