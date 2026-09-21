import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const inferenceOperation = {
  id: "01a0c643-35e0-74f1-9eeb-e5ec91c9010b",
  type: "page-type/text-property",
  slug: "inference-operation",
  propertySlug: "operation",
  definition: "what a model service was asked to do",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
