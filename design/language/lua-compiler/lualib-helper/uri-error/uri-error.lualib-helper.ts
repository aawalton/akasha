import type { LualibHelper } from "akasha/design/language/lua-compiler/lualib-helper/lualib-helper.page-type.types.ts"

export const uriError = {
  id: "01a081c1-4ea6-792e-a6ae-207740e9cc6d",
  type: "lualib-helper",
  slug: "uri-error",
  definition: "the error type a malformed URI is",
  code: "ts",
  luaExport: "URIError",
} as const satisfies LualibHelper
