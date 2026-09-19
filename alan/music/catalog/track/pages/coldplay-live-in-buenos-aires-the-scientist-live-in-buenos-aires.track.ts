import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresTheScientistLiveInBuenosAires = {
  id: "01a0b9ee-d1ca-7afd-ba8e-e35ba35b5d1e",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-the-scientist-live-in-buenos-aires",
  ownLength: 6.476666666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1aZhbOdRqshLS6uPjiO8Y4",
      externalLink: "https://open.spotify.com/track/1aZhbOdRqshLS6uPjiO8Y4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Scientist - Live in Buenos Aires",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "thescientistliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|388600",
} as const satisfies Track
