import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const outcomeTierColor = {
  id: "01a1839b-06ef-7091-a5c4-128654c7607b",
  type: "page-type/relation-property",
  slug: "outcome-tier-color",
  propertySlug: "color",
  definition: "the color an outcome tier is drawn in",
  targetPageType: "page-type/color",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tiers run from red at the worst through to purple at the best.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T17:42:17.581Z",
  updatedAt: "2026-10-28T17:42:17.581Z",
} as const satisfies RelationProperty
