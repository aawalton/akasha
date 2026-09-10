import type { Lualib } from "akasha/language-design/lua-compiler/lualibs/lualib.page-type.types.ts"

export const descriptorSet = {
  id: "01a08c45-5d05-7de2-b1a9-08474f3f5534",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "descriptor-set",
  definition: "a key written through the setter a metatable holds, or written raw",
  code: "ts",
  luaExport: "__TS__DescriptorSet",
} as const satisfies Lualib
