import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const source = {
  id: "01a063de-2c60-701e-9aed-2067429a2664",
  type: "page-type/select-property",
  slug: "source",
  propertySlug: "source",
  definition: "the provider from which a collection was imported",
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
    "netflix",
    "prime-video",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A provider is named here before a page may state that provider.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T20:44:59.872Z",
  updatedAt: "2026-10-14T18:58:02.294Z",
} as const satisfies SelectProperty
