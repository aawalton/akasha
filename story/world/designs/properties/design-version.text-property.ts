import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const designVersion = {
  id: "01a06577-f385-73b7-96a2-00714e5f5ecd",
  type: "page-type/text-property",
  slug: "design-version",
  propertySlug: "version",
  definition: "which revision of a design this is",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-09-03T04:12:35.077Z",
  updatedAt: "2026-09-19T05:02:31.000Z",
} as const satisfies TextProperty
