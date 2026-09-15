import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaAndWinterCameMiraculum = {
  id: "01a0a5b0-0f95-7846-83fa-b8a1db317963",
  type: "page-type/track",
  slug: "enya-and-winter-came-miraculum",
  ownLength: 3.89615,
  ownProgress: 0,
  partOfCollections: ["release/enya-and-winter-came"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6uAPxWiyT6h9SCBJGTl6za",
      externalLink: "https://open.spotify.com/track/6uAPxWiyT6h9SCBJGTl6za",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Miraculum",
} as const satisfies Track
