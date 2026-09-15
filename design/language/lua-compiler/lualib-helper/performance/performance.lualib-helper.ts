import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const performance = {
  id: "01a081f7-142d-7159-badc-22c250452723",
  type: "lualib-helper",
  slug: "performance",
  definition: "the clock a program reads the milliseconds since the game started from",
  code: "ts",
  luaExport: "performance",
} as const satisfies LualibHelper
