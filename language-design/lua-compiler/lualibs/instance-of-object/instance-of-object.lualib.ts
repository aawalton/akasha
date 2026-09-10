import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const instanceOfObject = {
  id: "01a081f7-142d-7e82-aa86-69bf9ac8d12c",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "instance-of-object",
  definition: "the answer whether a value is an instance of Object",
  code: "ts",
  luaExport: "__TS__InstanceOfObject",
} as const satisfies Lualib
