import type { Lualib } from "@akasha/code/lualib"

export const syntaxError = {
  id: "01a081c0-fa43-7ec5-b77d-512453fbfd7a",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "syntax-error",
  definition: "the error type source the parser refuses is",
  code: "ts",
  luaExport: "SyntaxError",
} as const satisfies Lualib
