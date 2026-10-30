import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const seatSection = {
  id: "01a0e3e9-41ec-73cf-ba91-c35764a845af",
  type: "page-type/computed-property",
  slug: "seat-section",
  propertySlug: "seat-section",
  definition: "where a list of seats shows a seat",
  holds: "text",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's section is read by the seat section module, as the editor reads it.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-27T17:28:29.932Z",
  updatedAt: "2026-10-30T14:35:25.635Z",
} as const satisfies ComputedProperty
