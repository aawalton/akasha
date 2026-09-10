import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type Frontier = "md"

export const frontier = {
  id: "01a0659f-93da-7009-a0c6-09e05f1e51eb",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "frontier",
  propertySlug: "frontier",
  definition: "where Alan's model of a topic thins",
} as const satisfies FileProperty
