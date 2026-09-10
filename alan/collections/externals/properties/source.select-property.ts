import type { SelectProperty } from "../../../../pages/select-properties/select-property.page-type.types.ts"

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
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "source",
  propertySlug: "source",
  definition: "where a collection was imported from",
  values: [
    "kindle",
    "musicbrainz",
    "open-library",
    "royal-road",
    "the-great-courses",
    "the-wandering-inn",
    "tmdb",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "No page names `spotify` as a source.",
    },
    {
      invariantKind: "departure",
      statement: "A provider is named here before a page may state that provider.",
    },
  ],
} as const satisfies SelectProperty
