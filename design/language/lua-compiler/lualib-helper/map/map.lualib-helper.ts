import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const map = {
  id: "01a08c54-2473-731c-bd8d-106345fd8bdd",
  type: "page-type/lualib-helper",
  slug: "map",
  definition: "keys held against values, in the order the keys arrived",
  code: "ts",
  luaExport: "Map",
} as const satisfies LualibHelper
