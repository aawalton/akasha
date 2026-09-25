import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const seatName = {
  id: "01a0657c-cb14-7705-a95e-4fca37cc48c2",
  type: "page-type/text-property",
  slug: "seat-name",
  propertySlug: "seat-name",
  definition: "the name of the seat of a log",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This property is text rather than a relation to a seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day of lines outlives the seat the day names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name here may be a name no seat has now.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
