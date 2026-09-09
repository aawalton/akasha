import type { TextProperty } from "@akasha/pages/text-property"

export type SeatName = string

export const seatName = {
  id: "01a0657c-cb14-7705-a95e-4fca37cc48c2",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "seat-name",
  propertySlug: "seat-name",
  definition: "the name of the seat whose processes wrote a day of lines",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This property is text rather than a relation to a seat.",
    },
    {
      invariantKind: "departure",
      statement: "A day of lines outlives the seat the day names.",
    },
    {
      invariantKind: "departure",
      statement: "A name here may be a name no seat has now.",
    },
  ],
} as const satisfies TextProperty
