import type { TextProperty } from "@akasha/pages-system/text-property"

export type WantedBy = string

export const wantedBy = {
  id: "01a06738-9f12-7cad-a582-cea97ec44e5e",
  pageTypeSlug: "text-property",
  slug: "wanted-by",
  propertySlug: "wanted-by",
  definition: "the target a unit is pulled in by",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
