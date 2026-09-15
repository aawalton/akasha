import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaAndWinterCameMyMyTimeFlies = {
  id: "01a0a5b0-0f51-75d0-acda-34359a896dc8",
  type: "track",
  slug: "enya-and-winter-came-my-my-time-flies",
  ownLength: 3.0486666666666666,
  ownProgress: 0,
  partOfCollections: ["release/enya-and-winter-came"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3F4oiFNHjYc5xCKmSfIsrN",
      externalLink: "https://open.spotify.com/track/3F4oiFNHjYc5xCKmSfIsrN",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "My! My! Time Flies!",
} as const satisfies Track
