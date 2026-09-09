import type { TextProperty } from "@akasha/pages/text-property"

export type CaptureSource = string

export const captureSource = {
  id: "01a0659f-93da-7006-88a8-f0b538d8b205",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "capture-source",
  propertySlug: "capture-source",
  definition: "the transcript a topic's score was read out of",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
