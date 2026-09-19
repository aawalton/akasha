import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresParadiseLiveInBuenosAires = {
  id: "01a0b9ee-d215-74f5-a3a8-75810d7638ed",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-paradise-live-in-buenos-aires",
  ownLength: 6.98955,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "314gi4w3RdZxlocdWw0Khr",
      externalLink: "https://open.spotify.com/track/314gi4w3RdZxlocdWw0Khr",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Paradise - Live in Buenos Aires",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "paradiseliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|419373",
  song: "song/coldplay-paradise",
} as const satisfies Track
