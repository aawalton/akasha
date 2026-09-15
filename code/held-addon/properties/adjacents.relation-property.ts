import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const adjacents = {
  id: "01a0819d-cca3-7df9-8049-79ddfe74c1e3",
  type: "relation-property",
  slug: "adjacents",
  propertySlug: "adjacents",
  definition: "the addons a bite at this addon reaches",
  targetPageType: "page-type/held-addon",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Adjacency is written as a bite meets an addon rather than mapped out up front.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An addon naming no adjacent here has had no bite reach past that addon.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
