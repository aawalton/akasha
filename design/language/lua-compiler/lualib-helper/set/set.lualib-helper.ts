import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const set = {
  id: "01a08c55-1674-7152-9977-f51d1fd1793d",
  type: "page-type/lualib-helper",
  slug: "set",
  definition: "values each held once, in the order they arrived",
  code: "ts",
  luaExport: "Set",
} as const satisfies LualibHelper
