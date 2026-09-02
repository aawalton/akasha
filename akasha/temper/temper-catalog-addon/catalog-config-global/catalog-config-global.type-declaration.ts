import type { TypeDeclaration } from "@akasha/code-system/type-declaration"

export const catalogConfigGlobal = {
  id: "01a063c1-6c82-7533-9e59-d07cde6f2943",
  pageTypeSlug: "type-declaration",
  slug: "catalog-config-global",
  definition: "the global a side file leaves the catalog add-on its next request in",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The game loads the side file before the compiled add-on.",
    },
    {
      invariantKind: "departure",
      statement: "An empty side file leaves the name holding nothing.",
    },
  ],
} as const satisfies TypeDeclaration
