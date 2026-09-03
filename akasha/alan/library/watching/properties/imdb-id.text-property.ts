import type { TextProperty } from "@akasha/pages-system/text-property"

export type ImdbId = string

export const imdbId = {
  id: "01a06599-ee09-7007-b8a2-be0208de08b8",
  pageTypeSlug: "text-property",
  slug: "imdb-id",
  propertySlug: "imdb-id",
  definition: "the id IMDb gives a show or a film",
  max: 20,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An IMDb id stands beside the id of the provider the page was read from.",
    },
  ],
} as const satisfies TextProperty
