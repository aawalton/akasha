import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const weakMap = {
  id: "01a08202-0fa9-7dae-887e-8517eee988cc",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "weak-map",
  definition: "the map with its keys weakly, so a key there may still be collected",
  code: "ts",
  luaExport: "WeakMap",
} as const satisfies Lualib
