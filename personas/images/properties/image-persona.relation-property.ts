import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type ImagePersona = Slug

export const imagePersona = {
  id: "01a06d65-2f71-7482-91b1-5eef3c586c64",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "image-persona",
  propertySlug: "persona",
  definition: "the persona a picture is drawn of",
  targetPageType: "page-type/persona",
} as const satisfies RelationProperty
