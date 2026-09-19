import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresClocksLiveInBuenosAires = {
  id: "01a0b9ee-d2b8-711b-8b6f-138b12a7d8e5",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-clocks-live-in-buenos-aires",
  ownLength: 4.336666666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4cHZ7W5R81upaIGZfqWxbB",
      externalLink: "https://open.spotify.com/track/4cHZ7W5R81upaIGZfqWxbB",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Clocks - Live in Buenos Aires",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "clocksliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|260200",
  song: "song/coldplay-clocks",
} as const satisfies Track
