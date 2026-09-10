import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const mapGroupBy = {
  id: "01a08202-0fa9-7a37-9767-374c19eaea36",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "map-group-by",
  definition: "the map holding items under the key each item is chosen by",
  code: "ts",
  luaExport: "__TS__MapGroupBy",
} as const satisfies Lualib
