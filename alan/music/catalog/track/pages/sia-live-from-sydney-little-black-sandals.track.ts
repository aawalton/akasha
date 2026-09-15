import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaLiveFromSydneyLittleBlackSandals = {
  id: "01a0a59c-0b9a-7d88-be75-ad168f4a5374",
  type: "page-type/track",
  slug: "sia-live-from-sydney-little-black-sandals",
  ownLength: 4.222883333333334,
  ownProgress: 0,
  partOfCollections: ["release/sia-live-from-sydney"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7rRZlc9g5JjDPiFaayvKvE",
      externalLink: "https://open.spotify.com/track/7rRZlc9g5JjDPiFaayvKvE",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Little Black Sandals",
} as const satisfies Track
