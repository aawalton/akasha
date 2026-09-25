import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const slideImage = {
  id: "01a0d8a3-4bd2-7ca8-a60c-2742ea798d63",
  type: "page-type/relation-property",
  slug: "slide-image",
  propertySlug: "image",
  definition: "the picture a slide shows",
  targetPageType: "page-type/image",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture a slide shows is served to a visitor who is not signed in.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
