import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const imagePersona = {
  id: "01a06d65-2f71-7482-91b1-5eef3c586c64",
  type: "page-type/relation-property",
  slug: "image-persona",
  propertySlug: "persona",
  definition: "the persona a picture is drawn of",
  targetPageType: "page-type/persona",
  types: "ts",
} as const satisfies RelationProperty
