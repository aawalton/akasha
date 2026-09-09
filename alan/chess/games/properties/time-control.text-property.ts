import type { TextProperty } from "@akasha/pages/text-property"

export type TimeControl = string

export const timeControl = {
  id: "01a06582-bd62-7806-aa06-cbbb5adca34e",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "time-control",
  propertySlug: "time-control",
  definition: "the clock a game was played on",
  maxLength: 50,
  nameFormat: null,
} as const satisfies TextProperty
