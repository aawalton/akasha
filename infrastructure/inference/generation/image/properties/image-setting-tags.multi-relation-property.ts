import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const imageSettingTags = {
  id: "01a0de87-c73f-7195-a07e-2a71a504cde1",
  type: "page-type/multi-relation-property",
  slug: "image-setting-tags",
  propertySlug: "setting-tags",
  definition: "the places or scenes an image is set in",
  targetPageType: "page-type/setting-tag",
  types: "ts",
} as const satisfies MultiRelationProperty
