import type { TextProperty } from "@akasha/pages-system/text-property"

export type StoryPremise = string

export const storyPremise = {
  id: "01a06577-f385-7179-9713-a0ebc7944548",
  pageTypeSlug: "text-property",
  slug: "story-premise",
  propertySlug: "premise",
  definition: "what a story is about, in the shape the story is told in",
  max: 8000,
  nameFormatSlug: null,
} as const satisfies TextProperty
