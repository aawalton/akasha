import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const storyRecorderName = {
  id: "01a0e054-324d-7f64-93f6-4fbc2dbf618e",
  type: "page-type/text-property",
  slug: "story-recorder-name",
  propertySlug: "name",
  definition: "what a story recorder is called",
  maxLength: 30,
  nameFormat: "name-format/start-case",
  types: "ts",
} as const satisfies TextProperty
