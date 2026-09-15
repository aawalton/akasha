import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const source = {
  id: "01a063de-2c60-701e-9aed-2067429a2664",
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
    "spotify",
    "trakt",
    "wikipedia",
    "wizarding-world",
    "project-euler",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A provider is named here before a page may state that provider.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
