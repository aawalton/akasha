import type { TextProperty } from "@akasha/pages/text-property"

export type StoryThemes = string

export const storyThemes = {
  id: "01a06577-f385-7140-a4d9-d83aeb4bbb85",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "story-themes",
  propertySlug: "themes",
  definition: "what a story keeps returning to",
  maxLength: 2000,
  nameFormat: null,
} as const satisfies TextProperty
