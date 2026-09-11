import type { Lualib } from "akasha/design/language/lua-compiler/lualibs/lualib.page-type.types.ts"

export const typeOf = {
  id: "01a081f7-142d-760d-b2bb-41b07737e0e7",
  type: "lualib",
  slug: "type-of",
  definition: "the ECMAScript name for the type a Lua value has",
  code: "ts",
  luaExport: "__TS__TypeOf",
} as const satisfies Lualib
