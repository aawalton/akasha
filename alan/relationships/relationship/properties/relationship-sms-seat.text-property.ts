import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const relationshipSmsSeat = {
  id: "01a16fe4-f2ce-7a52-a55b-f36e7985ed7c",
  type: "page-type/text-property",
  slug: "relationship-sms-seat",
  propertySlug: "relationship-sms-seat",
  definition: "the name of the seat a text from this person reaches in place of a handler seat",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A relationship naming no seat sends a text to the handler seat its person names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat is named here as text, since a seat's page goes while no agent sits in it.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-24T21:50:37.773Z",
  updatedAt: "2026-10-24T21:50:37.773Z",
} as const satisfies TextProperty
