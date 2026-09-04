import type { Module } from "@akasha/code-system/module"

export const formulaRun = {
  id: "01a05c11-6371-7007-aba2-9ed22b544690",
  pageTypeSlug: "module",
  slug: "formula-run",
  definition: "the value a read formula answers over a page's values",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A case works out only the value of the row whose test passed.",
    },
    {
      invariantKind: "departure",
      statement: "A case row matches only where its test answers true.",
    },
    {
      invariantKind: "departure",
      statement: "An operator that can answer from its left side alone leaves its right unrun.",
    },
    {
      invariantKind: "departure",
      statement: "An operator that reaches an absent value answers absent.",
    },
    {
      invariantKind: "departure",
      statement: "A function that reaches an absent value answers absent.",
    },
    {
      invariantKind: "departure",
      statement: "A text literal answers absent where any reference in that literal is absent.",
    },
    {
      invariantKind: "departure",
      statement: "`==` and `!=` answer a boolean rather than absent.",
    },
    {
      invariantKind: "departure",
      statement: "An absent value is equal only to another absent value.",
    },
    {
      invariantKind: "departure",
      statement: "`??` answers its left side where that side is there.",
    },
    {
      invariantKind: "departure",
      statement: "`??` answers its right side where its left side is absent.",
    },
    {
      invariantKind: "departure",
      statement: "Dividing by zero answers absent.",
    },
  ],
} as const satisfies Module
