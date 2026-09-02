import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Tracks = "jsonl"

export const tracks = {
  id: "01a06240-340f-700b-b409-ccc0e5bff5e6",
  pageTypeSlug: "page-property-entry",
  slug: "tracks",
  propertySlug: "tracks",
  definition: "every track a person has heard, one to a line",
  partSlugs: [
    "instant-property/first-heard-at",
    "text-property/artist-name",
    "text-property/heard-source",
    "text-property/spotify-track-id",
    "text-property/title-key",
    "text-property/track-name",
  ],
  properties: [
    { pagePropertySlug: "spotify-track-id", required: true, many: false },
    { pagePropertySlug: "title-key", required: true, many: false },
    { pagePropertySlug: "track-name", required: false, many: false },
    { pagePropertySlug: "artist-name", required: false, many: false },
    { pagePropertySlug: "first-heard-at", required: false, many: false },
    { pagePropertySlug: "heard-source", required: false, many: false },
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
