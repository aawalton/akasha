import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const storyReviewerName = {
  id: "01a0deb0-2f42-746e-aeaf-e71f511a6339",
  type: "page-type/text-property",
  slug: "story-reviewer-name",
  propertySlug: "name",
  definition: "what a story reviewer is called",
  maxLength: 30,
  nameFormat: "name-format/start-case",
  types: "ts",
} as const satisfies TextProperty
