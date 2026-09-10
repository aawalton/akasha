import type { PagePropertyEntry } from "akasha/pages/property-entries/page-property-entry.page-type.types.ts"

export type Tracks = "jsonl"

export const tracks = {
  id: "01a06240-340f-700b-b409-ccc0e5bff5e6",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "tracks",
  propertySlug: "tracks",
  definition: "every track a person has heard, one to a line",
  parts: [
    "instant-property/first-heard-at",
    "text-property/artist-name",
    "text-property/heard-source",
    "text-property/spotify-track-id",
    "text-property/title-key",
    "text-property/track-name",
  ],
  properties: [
    { pageProperty: "text-property/spotify-track-id", required: true, many: false },
    { pageProperty: "text-property/title-key", required: true, many: false },
    { pageProperty: "text-property/track-name", required: false, many: false },
    { pageProperty: "text-property/artist-name", required: false, many: false },
    { pageProperty: "instant-property/first-heard-at", required: false, many: false },
    { pageProperty: "text-property/heard-source", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every heard track names a Spotify track id.",
    },
    {
      invariantKind: "departure",
      statement: "No two heard tracks on one page name the same Spotify track id.",
    },
    {
      invariantKind: "departure",
      statement: "A heard track is written the first time the track is heard.",
    },
  ],
} as const satisfies PagePropertyEntry
