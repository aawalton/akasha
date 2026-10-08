import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const stringEndsWith = {
  id: "01a081f7-142d-792b-9e9c-fc28d820ba0e",
  type: "page-type/lualib-helper",
  slug: "string-ends-with",
  definition: "the answer whether text ends with other text at a position",
  code: "ts",
  luaExport: "__TS__StringEndsWith",
  createdAt: "2026-09-08T17:00:48.557Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
