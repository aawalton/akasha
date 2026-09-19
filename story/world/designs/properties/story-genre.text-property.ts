import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const storyGenre = {
  id: "01a06577-f385-76b9-b54f-2a54bbf62488",
  type: "page-type/text-property",
  slug: "story-genre",
  propertySlug: "genre",
  definition: "a kind of story a design is written as",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
