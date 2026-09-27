import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const turnEndsAt = {
  id: "01a0e3a6-ba36-7c2b-a54c-7c264d49c80f",
  type: "page-type/instant-property",
  slug: "turn-ends-at",
  propertySlug: "ends-at",
  definition: "the in-game date and clock time a played turn ends at",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The in-game clock is written as UTC, so the time written is the time the story shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's end time is never before the end time of the turn before.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
