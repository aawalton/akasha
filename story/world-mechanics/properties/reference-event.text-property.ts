import type { TextProperty } from "@akasha/pages-system/text-property"

export type ReferenceEvent = string

export const referenceEvent = {
  id: "01a06558-a991-7b74-a9b8-26a430ce7964",
  pageTypeSlug: "text-property",
  slug: "reference-event",
  propertySlug: "event",
  definition: "what happened to the mechanic where the text named it",
  max: 36,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
