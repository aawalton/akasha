import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaMayItBeIsobella = {
  id: "01a0a5b0-22fc-79c5-9871-e27daf2068a7",
  type: "page-type/track",
  slug: "enya-may-it-be-isobella",
  ownLength: 4.454,
  ownProgress: 0,
  partOfCollections: ["release/enya-may-it-be"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6UKRu6MneG09nG4dMtbelR",
      externalLink: "https://open.spotify.com/track/6UKRu6MneG09nG4dMtbelR",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Isobella",
} as const satisfies Track
