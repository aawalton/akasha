import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const appointmentAt = {
  id: "01a0e3b2-a002-7fc4-bd6d-43ed66441878",
  type: "page-type/instant-property",
  slug: "appointment-at",
  propertySlug: "appointment-at",
  definition: "the in-game date and clock time an appointment is set for",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The in-game clock is written as UTC, so the time written is the time the story shows.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
