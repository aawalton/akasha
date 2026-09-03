import type { TextProperty } from "@akasha/pages-system/text-property"

export type PosterPath = string

export const posterPath = {
  id: "01a06599-ee09-7008-9531-f53ecb8ff93d",
  pageTypeSlug: "text-property",
  slug: "poster-path",
  propertySlug: "poster-path",
  definition: "the path to the artwork standing for a collection",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path is read against the provider's image host rather than against akasha.",
    },
  ],
} as const satisfies TextProperty
