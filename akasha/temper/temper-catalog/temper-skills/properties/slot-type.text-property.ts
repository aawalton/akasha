import type { TextProperty } from "@akasha/pages-system/text-property"

export type SlotType = string

export const slotType = {
  id: "01a05fca-cb87-767f-90a1-977b2c340bc6",
  pageTypeSlug: "text-property",
  slug: "slot-type",
  propertySlug: "slot-type",
  definition: "the slot in a grimoire a script is set into",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
