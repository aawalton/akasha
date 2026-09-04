import type { Module } from "@akasha/code-system/module"

export const attributeStoplights = {
  id: "01a06858-8cfa-79e8-a5bc-b735b8f2f652",
  pageTypeSlug: "module",
  slug: "attribute-stoplights",
  definition: "the attributes group answered as the stoplights Alan's tile reads",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The group answered for here is the attributes group.",
    },
    {
      invariantKind: "departure",
      statement: "The key each reading travels under is `attribute`.",
    },
    {
      invariantKind: "departure",
      statement: "The tile shipped against this reads that key as text that is always there.",
    },
  ],
} as const satisfies Module
