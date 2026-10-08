import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const stringCharAt = {
  id: "01a081ed-ab46-7754-a8f3-22f0685ead07",
  type: "page-type/lualib-helper",
  slug: "string-char-at",
  definition: "the character text holds at a position, or empty text where there is none",
  code: "ts",
  luaExport: "__TS__StringCharAt",
  createdAt: "2026-09-08T16:50:31.878Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
