import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const iihsRating = {
  id: "01a0c542-a590-7322-a821-74b86dea3f6d",
  type: "page-type/select-property",
  slug: "iihs-rating",
  propertySlug: "iihs-rating",
  definition: "the award IIHS gives a car trim for safety",
  values: ["TSP+", "TSP", "good", "not-rated"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A trim the institute has not tested states `not-rated`.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-21T18:37:54.448Z",
  updatedAt: "2026-10-30T15:39:12.900Z",
} as const satisfies SelectProperty
