import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type ColorFrom = Slug

export const colorFrom = {
  id: "01a063bd-a526-7595-8a5b-3e28242bfe2b",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "color-from",
  propertySlug: "color-from",
  definition: "the reading whose color this one takes",
  targetPageType: "page-type/readout",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A readout taking another's color is read against that other's scale.",
    },
    {
      invariantKind: "departure",
      statement: "The figure stays the reading this readout took.",
    },
  ],
} as const satisfies RelationProperty
