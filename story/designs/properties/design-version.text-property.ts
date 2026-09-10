import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type DesignVersion = string

export const designVersion = {
  id: "01a06577-f385-73b7-96a2-00714e5f5ecd",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "design-version",
  propertySlug: "version",
  definition: "which revision of a design this is",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
