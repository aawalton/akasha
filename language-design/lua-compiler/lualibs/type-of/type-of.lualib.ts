import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const typeOf = {
  id: "01a081f7-142d-760d-b2bb-41b07737e0e7",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "type-of",
  definition: "the ECMAScript name for the type a Lua value has",
  code: "ts",
  luaExport: "__TS__TypeOf",
} as const satisfies Lualib
