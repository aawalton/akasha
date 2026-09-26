import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const imagePoseTags = {
  id: "01a0de87-c73f-73cb-95ae-98e0189fc397",
  type: "page-type/multi-relation-property",
  slug: "image-pose-tags",
  propertySlug: "pose-tags",
  definition: "the ways the figures in an image are posed",
  targetPageType: "page-type/pose-tag",
  types: "ts",
} as const satisfies MultiRelationProperty
