import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const setDescriptor = {
  id: "01a08c45-86c1-7418-879a-72f1aa1e347f",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "set-descriptor",
  definition: "a descriptor filed on a target's metatable, with the index hooks put in place",
  code: "ts",
  luaExport: "__TS__SetDescriptor",
} as const satisfies Lualib
