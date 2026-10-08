import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const weakSet = {
  id: "01a08202-0fa9-7cc0-b52f-e81bdc5c27df",
  type: "page-type/lualib-helper",
  slug: "weak-set",
  definition: "the set with its values weakly, so a value there may still be collected",
  code: "ts",
  luaExport: "WeakSet",
  createdAt: "2026-09-08T17:12:48.297Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
