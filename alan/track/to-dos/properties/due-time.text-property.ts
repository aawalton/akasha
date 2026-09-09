import type { TextProperty } from "@akasha/pages/text-property"

export type DueTime = string

export const dueTime = {
  id: "01a065a1-49b7-75e1-a270-9a54bc7948cf",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "due-time",
  propertySlug: "due-time",
  definition: "the time of day a to-do comes due",
  maxLength: 20,
  nameFormat: null,
} as const satisfies TextProperty
