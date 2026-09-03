import type { TextProperty } from "@akasha/pages-system/text-property"

export type StoryTone = string

export const storyTone = {
  id: "01a06577-f385-77c5-8044-fa6dc0c5d353",
  pageTypeSlug: "text-property",
  slug: "story-tone",
  propertySlug: "tone",
  definition: "how a story is meant to feel as it is read",
  max: 4000,
  nameFormatSlug: null,
} as const satisfies TextProperty
