import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const gym = {
  id: "01a11b35-dc1e-7e57-a8b9-943c5f793e94",
  type: "page-type/relation-property",
  slug: "gym",
  propertySlug: "gym",
  definition: "the gym a set was performed at",
  targetPageType: "page-type/gym",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A set naming no gym was performed at home.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
