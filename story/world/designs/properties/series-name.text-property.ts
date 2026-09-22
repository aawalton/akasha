import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const seriesName = {
  id: "01a06577-f385-7024-8da1-d79b0757133e",
  type: "page-type/text-property",
  slug: "series-name",
  propertySlug: "series-name",
  definition: "a story's series",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
