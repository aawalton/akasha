import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresEverglowLiveInBuenosAires = {
  id: "01a0b9ee-d295-7b88-9c99-39df9254888b",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-everglow-live-in-buenos-aires",
  ownLength: 4.922883333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4U5Cr41d1K6s48GAndvCdM",
      externalLink: "https://open.spotify.com/track/4U5Cr41d1K6s48GAndvCdM",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Everglow - Live in Buenos Aires",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "everglowliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|295373",
} as const satisfies Track
