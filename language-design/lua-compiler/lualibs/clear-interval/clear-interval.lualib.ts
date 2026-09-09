import type { Lualib } from "@akasha/code/lualib"

export const clearInterval = {
  id: "01a081d0-f23b-7f54-9a5f-1793378c6dfc",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "clear-interval",
  definition: "the unregistering a repeated call is given by its handle",
  code: "ts",
  luaExport: "__TS__ClearInterval",
} as const satisfies Lualib
