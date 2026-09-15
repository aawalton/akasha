import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const arrayPushArray = {
  id: "01a081ed-ab46-7b7c-bd8b-9c0fba21f848",
  type: "page-type/lualib-helper",
  slug: "array-push-array",
  definition: "the length an array reaches once another array's elements are added to its end",
  code: "ts",
  luaExport: "__TS__ArrayPushArray",
} as const satisfies LualibHelper
