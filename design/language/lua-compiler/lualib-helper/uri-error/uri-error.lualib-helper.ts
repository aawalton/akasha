import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const uriError = {
  id: "01a081c1-4ea6-792e-a6ae-207740e9cc6d",
  type: "page-type/lualib-helper",
  slug: "uri-error",
  definition: "the error type a malformed URI is",
  code: "ts",
  luaExport: "URIError",
  createdAt: "2026-09-08T16:02:04.582Z",
  updatedAt: "2026-09-15T17:24:36.000Z",
} as const satisfies LualibHelper
