import type { TextProperty } from "@akasha/pages-system/text-property"

export type DesignVersion = string

export const designVersion = {
  id: "01a06577-f385-73b7-96a2-00714e5f5ecd",
  pageTypeSlug: "text-property",
  slug: "design-version",
  propertySlug: "version",
  definition: "which revision of a design this is",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
