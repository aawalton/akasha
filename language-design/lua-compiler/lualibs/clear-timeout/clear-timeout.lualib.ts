import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const clearTimeout = {
  id: "01a081d0-6ee0-7c98-98ce-5974b65ef70b",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "clear-timeout",
  definition: "the cancelling a delayed call is given by its handle",
  code: "ts",
  luaExport: "__TS__ClearTimeout",
} as const satisfies Lualib
