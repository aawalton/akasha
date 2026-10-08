import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const setDescriptor = {
  id: "01a08c45-86c1-7418-879a-72f1aa1e347f",
  type: "page-type/lualib-helper",
  slug: "set-descriptor",
  definition: "a descriptor filed on a target's metatable, with the index hooks put in place",
  code: "ts",
  luaExport: "__TS__SetDescriptor",
  createdAt: "2026-09-10T17:02:41.857Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
