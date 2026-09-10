import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const arrayPushArray = {
  id: "01a081ed-ab46-7b7c-bd8b-9c0fba21f848",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-push-array",
  definition: "the length an array reaches once another array's elements are added to its end",
  code: "ts",
  luaExport: "__TS__ArrayPushArray",
} as const satisfies Lualib
