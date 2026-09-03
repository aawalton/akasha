import type { TextProperty } from "@akasha/pages-system/text-property"

export type StoryGenre = string

export const storyGenre = {
  id: "01a06577-f385-76b9-b54f-2a54bbf62488",
  pageTypeSlug: "text-property",
  slug: "story-genre",
  propertySlug: "genre",
  definition: "a kind of story a design is written as",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
