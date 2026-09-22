import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const traitStory = {
  id: "01a0ca5d-386f-769b-ae6d-140a51fa8fe8",
  type: "page-type/relation-property",
  slug: "trait-story",
  propertySlug: "story",
  definition: "the story a trait holds in",
  targetPageType: "page-type/story",
  types: "ts",
} as const satisfies RelationProperty
