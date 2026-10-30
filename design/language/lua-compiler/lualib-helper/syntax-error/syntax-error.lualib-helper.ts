import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const syntaxError = {
  id: "01a081c0-fa43-7ec5-b77d-512453fbfd7a",
  type: "page-type/lualib-helper",
  slug: "syntax-error",
  definition: "the error type for code the parser refuses",
  code: "ts",
  luaExport: "SyntaxError",
  createdAt: "2026-09-08T16:01:42.979Z",
  updatedAt: "2026-10-30T15:59:19.335Z",
} as const satisfies LualibHelper
