import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const weakMap = {
  id: "01a08202-0fa9-7dae-887e-8517eee988cc",
  type: "page-type/lualib-helper",
  slug: "weak-map",
  definition: "the map with its keys weakly, so a key there may still be collected",
  code: "ts",
  luaExport: "WeakMap",
  createdAt: "2026-09-08T17:12:48.297Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
