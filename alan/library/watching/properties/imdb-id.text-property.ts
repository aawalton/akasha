import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ImdbId = string

export const imdbId = {
  id: "01a06599-ee09-7007-b8a2-be0208de08b8",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "imdb-id",
  propertySlug: "imdb-id",
  definition: "the id IMDb gives a show or a film",
  maxLength: 20,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An IMDb id sits beside the id of the provider the page was read from.",
    },
  ],
} as const satisfies TextProperty
