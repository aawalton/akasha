import type { TypeDeclaration } from "@akasha/code-system/type-declaration"

export const sparseArray = {
  id: "01a06c82-21b7-7000-a8aa-ec4efb907809",
  pageTypeSlug: "type-declaration",
  slug: "sparse-array",
  definition: "the array carrying its own length that a spread of holes compiles to",
  d: "ts",
} as const satisfies TypeDeclaration
