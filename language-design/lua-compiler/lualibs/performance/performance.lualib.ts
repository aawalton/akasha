import type { Lualib } from "@akasha/code/lualib"

export const performance = {
  id: "01a081f7-142d-7159-badc-22c250452723",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "performance",
  definition: "the clock a program reads the milliseconds since the game started from",
  code: "ts",
  luaExport: "performance",
} as const satisfies Lualib
