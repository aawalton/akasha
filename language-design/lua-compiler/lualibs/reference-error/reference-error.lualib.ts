import type { Lualib } from "@akasha/code/lualib"

export const referenceError = {
  id: "01a081c0-cd99-742a-abe0-4add7789e920",
  pageTypeSlug: "lualib",
  type: "lualib",
  slug: "reference-error",
  definition: "the error type a name reaching nothing is",
  code: "ts",
  luaExport: "ReferenceError",
} as const satisfies Lualib
