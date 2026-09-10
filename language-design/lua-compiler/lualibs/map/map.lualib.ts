import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const map = {
  id: "01a08c54-2473-731c-bd8d-106345fd8bdd",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "map",
  definition: "keys held against values, in the order the keys arrived",
  code: "ts",
  luaExport: "Map",
} as const satisfies Lualib
