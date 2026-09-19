import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const sourceChapter = {
  id: "01a0b6f7-6d0f-7fd3-8ed5-9d8a15f957e5",
  type: "page-type/text-property",
  slug: "source-chapter",
  propertySlug: "source-chapter",
  definition: "the chapter a claim cites, as that chapter is labelled",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
