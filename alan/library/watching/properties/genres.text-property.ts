import type { TextProperty } from "@akasha/pages/text-property"

export type Genres = string

export const genres = {
  id: "01a06599-ee09-7006-a413-b286ec4d7f8d",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "genres",
  propertySlug: "genres",
  definition: "a kind the provider files a collection under",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A genre is the provider's classing rather than the person's tag.",
    },
    {
      invariantKind: "departure",
      statement: "A genre is written as the provider writes that genre.",
    },
  ],
} as const satisfies TextProperty
