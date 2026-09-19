import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const storyTone = {
  id: "01a06577-f385-77c5-8044-fa6dc0c5d353",
  type: "page-type/text-property",
  slug: "story-tone",
  propertySlug: "tone",
  definition: "how a story is meant to feel as it is read",
  maxLength: 4000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
