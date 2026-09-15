import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const attributeStoplights = {
  id: "01a06858-8cfa-79e8-a5bc-b735b8f2f652",
  type: "route",
  slug: "attribute-stoplights",
  definition: "the attributes group answered as the stoplights Alan's tile reads",
  code: "ts",
  test: "ts",
  urlPath: "api/attribute-stoplights",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The group answered for here is the attributes group.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key each reading travels under is `attribute`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tile shipped against this reads that key as text that is always there.",
    },
  ],
} as const satisfies Route
