import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const objectGetOwnPropertyDescriptor = {
  id: "01a08c46-e40e-78f9-85ea-4565375b42c3",
  type: "page-type/lualib-helper",
  slug: "object-get-own-property-descriptor",
  definition: "the descriptor a key has on an object's own metatable",
  code: "ts",
  luaExport: "__TS__ObjectGetOwnPropertyDescriptor",
} as const satisfies LualibHelper
