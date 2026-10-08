import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const stringSubstring = {
  id: "01a081f7-142d-7eed-bf68-b7da58f25b14",
  type: "page-type/lualib-helper",
  slug: "string-substring",
  definition: "the text between two indexes of other text, the lower index first",
  code: "ts",
  luaExport: "__TS__StringSubstring",
  createdAt: "2026-09-08T17:00:48.557Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
