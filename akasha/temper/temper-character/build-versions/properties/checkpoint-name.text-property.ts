import type { TextProperty } from "@akasha/pages-system/text-property"

export type CheckpointName = string

export const checkpointName = {
  id: "01a0685d-89aa-7e0e-87ba-fd8437784410",
  pageTypeSlug: "text-property",
  slug: "checkpoint-name",
  propertySlug: "checkpoint-name",
  definition: "what a version kept on purpose is called",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
