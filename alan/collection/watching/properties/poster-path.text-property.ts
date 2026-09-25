import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const posterPath = {
  id: "01a06599-ee09-7008-9531-f53ecb8ff93d",
  type: "page-type/text-property",
  slug: "poster-path",
  propertySlug: "poster-path",
  definition: "the path to the artwork representing a collection",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is read against the provider's image host rather than against akasha.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
