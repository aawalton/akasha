import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayShiverForYou = {
  id: "01a0b9ef-043a-7454-921c-a63d66277381",
  type: "page-type/track",
  slug: "coldplay-shiver-for-you",
  ownLength: 5.731766666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-shiver"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6hQ1OH4kWqkjxpZQt0rNwr",
      externalLink: "https://open.spotify.com/track/6hQ1OH4kWqkjxpZQt0rNwr",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "For You",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "foryou|4gzpq5DPGxSnKTe4SA8HAU|343906",
} as const satisfies Track
