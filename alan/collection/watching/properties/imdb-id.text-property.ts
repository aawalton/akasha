import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const imdbId = {
  id: "01a06599-ee09-7007-b8a2-be0208de08b8",
  type: "page-type/text-property",
  slug: "imdb-id",
  propertySlug: "imdb-id",
  definition: "the id IMDb gives a show or a film",
  maxLength: 20,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An IMDb id sits beside the id of the provider the page was read from.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
