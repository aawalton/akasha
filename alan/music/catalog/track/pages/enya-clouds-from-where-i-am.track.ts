import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaCloudsFromWhereIAm = {
  id: "01a0a5b0-2a8e-75d8-ad60-5d5d6e429178",
  type: "track",
  slug: "enya-clouds-from-where-i-am",
  ownLength: 2.3633333333333333,
  ownProgress: 0,
  partOfCollections: ["release/enya-clouds"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4vL8xB2vk5UWWQweeVpFG2",
      externalLink: "https://open.spotify.com/track/4vL8xB2vk5UWWQweeVpFG2",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "From Where I Am",
} as const satisfies Track
