import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const objectGetOwnPropertyDescriptor = {
  id: "01a08c46-e40e-78f9-85ea-4565375b42c3",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "object-get-own-property-descriptor",
  definition: "the descriptor one key has on an object's own metatable",
  code: "ts",
  luaExport: "__TS__ObjectGetOwnPropertyDescriptor",
} as const satisfies Lualib
