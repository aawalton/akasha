import type { Slug } from "akasha/pages/properties/slug.text-property.ts"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type Adjacents = List<Slug>

export const adjacents = {
  id: "01a0819d-cca3-7df9-8049-79ddfe74c1e3",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "adjacents",
  propertySlug: "adjacents",
  definition: "the addons a bite at this addon reaches",
  targetPageType: "page-type/held-addon",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Adjacency is written as a bite meets an addon rather than mapped out up front.",
    },
    {
      invariantKind: "departure",
      statement: "An addon naming no adjacent here has had no bite reach past that addon.",
    },
  ],
} as const satisfies RelationProperty
