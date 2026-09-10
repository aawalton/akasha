import type { Lualib } from "akasha/code-system/lualibs/lualib.page-type.types.ts"

export const uriError = {
  id: "01a081c1-4ea6-792e-a6ae-207740e9cc6d",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "uri-error",
  definition: "the error type a malformed URI is",
  code: "ts",
  luaExport: "URIError",
} as const satisfies Lualib
