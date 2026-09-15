import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const objectRest = {
  id: "01a081f7-142d-7552-a0c2-e20b7448dfd3",
  type: "page-type/lualib-helper",
  slug: "object-rest",
  definition: "the object of the properties a destructuring left over",
  code: "ts",
  luaExport: "__TS__ObjectRest",
} as const satisfies LualibHelper
