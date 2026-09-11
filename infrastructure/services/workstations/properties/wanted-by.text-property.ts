import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const wantedBy = {
  id: "01a06738-9f12-7cad-a582-cea97ec44e5e",
  type: "text-property",
  slug: "wanted-by",
  propertySlug: "wanted-by",
  definition: "the target a unit is pulled in by",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
