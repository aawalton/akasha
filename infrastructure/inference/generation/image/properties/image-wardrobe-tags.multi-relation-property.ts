import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const imageWardrobeTags = {
  id: "01a0de87-c73f-7f65-b9f3-7f18c2f9d1c0",
  type: "page-type/multi-relation-property",
  slug: "image-wardrobe-tags",
  propertySlug: "wardrobe-tags",
  definition: "what the figures in an image wear",
  targetPageType: "page-type/wardrobe-tag",
  types: "ts",
} as const satisfies MultiRelationProperty
