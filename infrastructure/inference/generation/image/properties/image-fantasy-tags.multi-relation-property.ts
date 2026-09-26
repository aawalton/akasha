import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const imageFantasyTags = {
  id: "01a0de87-c73f-7565-917e-b10b0995b103",
  type: "page-type/multi-relation-property",
  slug: "image-fantasy-tags",
  propertySlug: "fantasy-tags",
  definition: "the fantasies an image draws on",
  targetPageType: "page-type/fantasy-tag",
  types: "ts",
} as const satisfies MultiRelationProperty
