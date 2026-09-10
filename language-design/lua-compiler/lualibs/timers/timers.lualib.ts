import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const timers = {
  id: "01a081d0-14eb-7f54-855f-49e695769403",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "timers",
  definition: "the handles, cancellations and names the timers share",
  code: "ts",
  luaExport: "__TS__Timers",
} as const satisfies Lualib
