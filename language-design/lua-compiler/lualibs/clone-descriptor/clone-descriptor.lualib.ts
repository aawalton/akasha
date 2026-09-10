import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const cloneDescriptor = {
  id: "01a08c45-0a63-7f2a-b14a-9b1b9e493efe",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "clone-descriptor",
  definition: "a property descriptor copied with its absent fields filled in",
  code: "ts",
  luaExport: "__TS__CloneDescriptor",
} as const satisfies Lualib
