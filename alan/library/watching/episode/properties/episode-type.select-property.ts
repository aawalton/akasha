import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const episodeType = {
  id: "01a06599-ee09-700b-b9c1-3c28e65e2b56",
  type: "page-type/select-property",
  slug: "episode-type",
  propertySlug: "episode-type",
  definition: "what an episode is to its own run",
  values: ["standard", "mid-season", "finale"],
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement:
        "The values are the ones the record has rather than every value the provider answers with.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
