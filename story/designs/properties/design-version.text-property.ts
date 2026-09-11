import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const designVersion = {
  id: "01a06577-f385-73b7-96a2-00714e5f5ecd",
  type: "text-property",
  slug: "design-version",
  propertySlug: "version",
  definition: "which revision of a design this is",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
