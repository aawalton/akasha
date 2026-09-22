import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const performance = {
  id: "01a081f7-142d-7159-badc-22c250452723",
  type: "page-type/lualib-helper",
  slug: "performance",
  definition: "the clock giving a program the milliseconds since the game started",
  code: "ts",
  luaExport: "performance",
} as const satisfies LualibHelper
