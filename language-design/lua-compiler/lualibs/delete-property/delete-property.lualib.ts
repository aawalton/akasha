import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const deleteProperty = {
  id: "01a08c43-7bf9-72e5-8169-d37d3c935c44",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "delete-property",
  definition: "a property taken off a target, refused where the descriptor is not configurable",
  code: "ts",
  luaExport: "__TS__Delete",
} as const satisfies Lualib
