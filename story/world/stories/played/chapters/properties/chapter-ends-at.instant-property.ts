import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const chapterEndsAt = {
  id: "01a0e7f2-5cad-7cc4-a9a1-e2277ecfaf2e",
  type: "page-type/instant-property",
  slug: "chapter-ends-at",
  propertySlug: "ends-at",
  definition: "the in-game date and clock time a played chapter ends at",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter ends when the last turn it took ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter whose last turn states no end time states none.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
