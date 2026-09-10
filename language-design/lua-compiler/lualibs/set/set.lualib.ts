import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const set = {
  id: "01a08c55-1674-7152-9977-f51d1fd1793d",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "set",
  definition: "values each held once, in the order they arrived",
  code: "ts",
  luaExport: "Set",
} as const satisfies Lualib
