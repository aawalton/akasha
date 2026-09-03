import type { TextProperty } from "@akasha/pages-system/text-property"

export type ExerciseExternalId = string

export const exerciseExternalId = {
  id: "01a0657b-1ad2-726a-b3a2-745a5e020626",
  pageTypeSlug: "text-property",
  slug: "exercise-external-id",
  propertySlug: "exercise-external-id",
  definition: "what the catalogue it was imported from calls this movement",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
