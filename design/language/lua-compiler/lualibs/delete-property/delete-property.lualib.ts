import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const deleteProperty = {
  id: "01a08c43-7bf9-72e5-8169-d37d3c935c44",
  type: "lualib",
  slug: "delete-property",
  definition: "a property taken off a target, refused where the descriptor is not configurable",
  code: "ts",
  luaExport: "__TS__Delete",
} as const satisfies Lualib
