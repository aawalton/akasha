import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const michaelJacksonMotownLegendsRockinRobin = {
  id: "01a0676a-d725-700c-b141-271511224794",
  type: "release",
  slug: "michael-jackson-motown-legends-rockin-robin",
  title: "Motown Legends: Rockin' Robin",
  partOfCollections: ["artist/michael-jackson"],
  position: 0,
  ownLength: 37.05105,
  ownProgress: 37.05105,
  unit: "unit/minutes",
  status: "completed",
  rank: "C",
  publishedAt: "1993-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5TQvMc68HXdXX1RecI7V7x",
      externalLink: "https://open.spotify.com/album/5TQvMc68HXdXX1RecI7V7x",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
