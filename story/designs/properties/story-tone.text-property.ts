import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type StoryTone = string

export const storyTone = {
  id: "01a06577-f385-77c5-8044-fa6dc0c5d353",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "story-tone",
  propertySlug: "tone",
  definition: "how a story is meant to feel as it is read",
  maxLength: 4000,
  nameFormat: null,
} as const satisfies TextProperty
