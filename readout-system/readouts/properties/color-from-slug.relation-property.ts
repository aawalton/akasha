import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ColorFromSlug = Slug

export const colorFromSlug = {
  id: "01a063bd-a526-7595-8a5b-3e28242bfe2b",
  pageTypeSlug: "relation-property",
  slug: "color-from-slug",
  propertySlug: "color-from-slug",
  definition: "the reading whose color this one takes",
  targetPageTypeSlug: "page-type/readout",
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
