import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const arrayJoin = {
  id: "01a081ed-ab46-74e9-a87b-d64376149421",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "array-join",
  definition: "the text an array's elements make with a separator between them",
  code: "ts",
  luaExport: "__TS__ArrayJoin",
} as const satisfies Lualib
