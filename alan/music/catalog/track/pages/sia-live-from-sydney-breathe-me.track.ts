import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaLiveFromSydneyBreatheMe = {
  id: "01a0a59c-0beb-73c0-b4d3-2b2295017d14",
  type: "track",
  slug: "sia-live-from-sydney-breathe-me",
  ownLength: 6.105333333333333,
  ownProgress: 0,
  partOfCollections: ["release/sia-live-from-sydney"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6LuJxDGp0ASyAlSZN64bR0",
      externalLink: "https://open.spotify.com/track/6LuJxDGp0ASyAlSZN64bR0",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Breathe Me",
} as const satisfies Track
