import type { TypeDeclaration } from "akasha/code-system/type-declarations/type-declaration.page-type.types.ts"

export const jennyCapacitorGlobals = {
  id: "01a0881b-03c9-76d7-910e-803dd38e06fa",
  pageTypeSlug: "type-declaration",
  type: "type-declaration",
  slug: "jenny-capacitor-globals",
  definition: "the Capacitor shell and its push plugin, as a page in that shell finds them",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The shell putting these on the window is built outside akasha.",
    },
    {
      invariantKind: "departure",
      statement: "A browser outside that shell carries none of them.",
    },
  ],
} as const satisfies TypeDeclaration
