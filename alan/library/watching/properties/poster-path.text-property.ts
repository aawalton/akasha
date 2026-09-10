import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type PosterPath = string

export const posterPath = {
  id: "01a06599-ee09-7008-9531-f53ecb8ff93d",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "poster-path",
  propertySlug: "poster-path",
  definition: "the path to the artwork representing a collection",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path is read against the provider's image host rather than against akasha.",
    },
  ],
} as const satisfies TextProperty
