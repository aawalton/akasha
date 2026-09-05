import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type TurnStateColorSlug = Slug

export const turnStateColorSlug = {
  id: "01a06d7a-e9f9-7644-9ee4-9ddcf6b723ba",
  pageTypeSlug: "relation-property",
  slug: "turn-state-color-slug",
  propertySlug: "color-slug",
  definition: "the color a seat in this turn state is drawn in",
  targetPageTypeSlug: "page-type/color",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This color draws the seat rather than the turn state's own page.",
    },
  ],
} as const satisfies RelationProperty
