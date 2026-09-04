import type { TextProperty } from "@akasha/pages-system/text-property"

export type TimeControl = string

export const timeControl = {
  id: "01a06582-bd62-7806-aa06-cbbb5adca34e",
  pageTypeSlug: "text-property",
  slug: "time-control",
  propertySlug: "time-control",
  definition: "the clock a game was played on",
  max: 50,
  nameFormatSlug: null,
} as const satisfies TextProperty
