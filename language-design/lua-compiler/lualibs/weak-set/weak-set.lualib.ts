import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const weakSet = {
  id: "01a08202-0fa9-7cc0-b52f-e81bdc5c27df",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "weak-set",
  definition: "the set with its values weakly, so a value there may still be collected",
  code: "ts",
  luaExport: "WeakSet",
} as const satisfies Lualib
