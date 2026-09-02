import type { TypeDeclaration } from "@akasha/code-system/type-declaration"

export const minimapStringIds = {
  id: "01a06269-2b15-7ed4-828d-87a96fe2a139",
  pageTypeSlug: "type-declaration",
  slug: "minimap-string-ids",
  definition: "the string ids the minimap makes for its settings and key bindings",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A string id here is made at load rather than shipped with the game.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies TypeDeclaration
