import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type TurnStateColor = Slug

export const turnStateColor = {
  id: "01a06d7a-e9f9-7644-9ee4-9ddcf6b723ba",
  pageTypeSlug: "relation-property",
  slug: "turn-state-color",
  propertySlug: "color",
  definition: "the color a seat in this turn state is drawn in",
  targetPageType: "page-type/color",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This color draws the seat rather than the turn state's own page.",
    },
  ],
} as const satisfies RelationProperty
