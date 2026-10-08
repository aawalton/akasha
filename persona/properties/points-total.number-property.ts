import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const pointsTotal = {
  id: "01a081cb-66ae-7cee-8e11-431ab034165b",
  type: "page-type/number-property",
  slug: "points-total",
  propertySlug: "points-total",
  definition: "the points earned since the day counting began",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This figure is kept rather than added up wherever the figure is read.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-08T16:13:06.094Z",
  updatedAt: "2026-09-21T16:02:13.000Z",
} as const satisfies NumberProperty
