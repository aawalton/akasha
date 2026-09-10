import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const stringCharAt = {
  id: "01a081ed-ab46-7754-a8f3-22f0685ead07",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "string-char-at",
  definition: "the character text holds at a position, or empty text where there is none",
  code: "ts",
  luaExport: "__TS__StringCharAt",
} as const satisfies Lualib
