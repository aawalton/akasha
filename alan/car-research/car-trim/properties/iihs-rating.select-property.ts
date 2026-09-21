import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const iihsRating = {
  id: "01a0c542-a590-7322-a821-74b86dea3f6d",
  type: "page-type/select-property",
  slug: "iihs-rating",
  propertySlug: "iihs-rating",
  definition: "the award the Insurance Institute for Highway Safety gave a trim",
  values: ["TSP+", "TSP", "good", "not-rated"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A trim the institute has not tested states `not-rated`.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
