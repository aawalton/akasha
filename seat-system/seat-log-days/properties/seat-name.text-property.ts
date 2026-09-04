import type { TextProperty } from "@akasha/pages-system/text-property"

export type SeatName = string

export const seatName = {
  id: "01a0657c-cb14-7705-a95e-4fca37cc48c2",
  pageTypeSlug: "text-property",
  slug: "seat-name",
  propertySlug: "seat-name",
  definition: "the name of the seat whose processes wrote a day of lines",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
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
      statement: "A name here may be one no seat holds any more.",
    },
  ],
} as const satisfies TextProperty
