import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const inferenceService = {
  id: "01a0c643-2215-7ce1-8d2a-d4d652df29bf",
  type: "page-type/text-property",
  slug: "inference-service",
  propertySlug: "service",
  definition: "the model service that made a thing",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-21T23:18:03.541Z",
  updatedAt: "2026-09-26T16:14:26.000Z",
} as const satisfies TextProperty
