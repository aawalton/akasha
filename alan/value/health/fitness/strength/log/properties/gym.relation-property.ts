import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const gym = {
  id: "01a11b35-dc1e-7e57-a8b9-943c5f793e94",
  type: "page-type/relation-property",
  slug: "gym",
  propertySlug: "gym",
  definition: "the gym an exercise set was performed at",
  targetPageType: "page-type/gym",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A set naming no gym was performed at home.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-08T11:11:17.022Z",
  updatedAt: "2026-10-30T17:07:36.971Z",
} as const satisfies RelationProperty
