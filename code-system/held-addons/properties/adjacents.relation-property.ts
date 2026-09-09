import type { Slug } from "@akasha/pages/page/slug"
import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type Adjacents = List<Slug>

export const adjacents = {
  id: "01a0819d-cca3-7df9-8049-79ddfe74c1e3",
  pageTypeSlug: "relation-property",
  slug: "adjacents",
  propertySlug: "adjacents",
  definition: "the addons a bite at this addon reaches",
  targetPageType: "page-type/held-addon",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Adjacency is written as a bite meets it rather than mapped out up front.",
    },
    {
      invariantKind: "departure",
      statement: "An addon naming none here has had no bite reach past it.",
    },
  ],
} as const satisfies RelationProperty
