import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const catalogConfigGlobal = {
  id: "01a063c1-6c82-7533-9e59-d07cde6f2943",
  type: "page-type/type-declaration",
  slug: "catalog-config-global",
  definition: "the global holding the next request a side file leaves the catalog add-on",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The game loads the side file before the compiled add-on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty side file leaves the name with nothing.",
    },
  ],
} as const satisfies TypeDeclaration
