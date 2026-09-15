import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const descriptorSet = {
  id: "01a08c45-5d05-7de2-b1a9-08474f3f5534",
  type: "lualib-helper",
  slug: "descriptor-set",
  definition: "a key written through the setter a metatable holds, or written raw",
  code: "ts",
  luaExport: "__TS__DescriptorSet",
} as const satisfies LualibHelper
