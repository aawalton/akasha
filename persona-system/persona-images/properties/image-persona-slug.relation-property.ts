import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ImagePersonaSlug = Slug

export const imagePersonaSlug = {
  id: "01a06d65-2f71-7482-91b1-5eef3c586c64",
  pageTypeSlug: "relation-property",
  slug: "image-persona-slug",
  propertySlug: "persona-slug",
  definition: "the persona a picture is drawn of",
  targetPageTypeSlug: "page-type/persona",
} as const satisfies RelationProperty
