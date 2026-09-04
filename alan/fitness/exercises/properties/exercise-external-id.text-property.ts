import type { TextProperty } from "@akasha/pages-system/text-property"

export type ExerciseExternalId = string

export const exerciseExternalId = {
  id: "01a0657e-2bbf-7990-a068-0de2e0ed328c",
  pageTypeSlug: "text-property",
  slug: "exercise-external-id",
  propertySlug: "exercise-external-id",
  definition: "what the catalogue it was imported from calls this movement",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
