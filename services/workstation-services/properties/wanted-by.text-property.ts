import type { TextProperty } from "@akasha/pages/text-property"

export type WantedBy = string

export const wantedBy = {
  id: "01a06738-9f12-7cad-a582-cea97ec44e5e",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "wanted-by",
  propertySlug: "wanted-by",
  definition: "the target a unit is pulled in by",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
