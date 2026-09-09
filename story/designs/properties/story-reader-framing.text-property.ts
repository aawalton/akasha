import type { TextProperty } from "@akasha/pages/text-property"

export type StoryReaderFraming = string

export const storyReaderFraming = {
  id: "01a06577-f385-7808-a302-f8a5c3082c45",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "story-reader-framing",
  propertySlug: "reader-framing",
  definition: "what the reader is taken to be while reading",
  maxLength: 1000,
  nameFormat: null,
} as const satisfies TextProperty
