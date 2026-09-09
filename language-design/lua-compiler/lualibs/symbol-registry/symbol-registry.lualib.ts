import type { Lualib } from "@akasha/code/lualib"

export const symbolRegistry = {
  id: "01a081d2-d753-79c0-bd5c-d2bff1c1ed5d",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "symbol-registry",
  definition: "the symbols a key reaches, shared by the two registry calls",
  code: "ts",
  luaExport: "__TS__SymbolRegistry",
} as const satisfies Lualib
