import type { TextProperty } from "@akasha/pages-system/text-property"

export type Source =
  | "kindle"
  | "musicbrainz"
  | "open-library"
  | "royal-road"
  | "the-great-courses"
  | "the-wandering-inn"
  | "tmdb"

export const source = {
  id: "01a063de-2c60-701e-9aed-2067429a2664",
  pageTypeSlug: "text-property",
  slug: "source",
  propertySlug: "source",
  definition: "where a collection was imported from",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No page names `spotify` as a source.",
    },
    {
      invariantKind: "departure",
      statement: "A provider is named here before a page may state that provider.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a select over the providers akasha reads from.",
    },
  ],
} as const satisfies TextProperty
