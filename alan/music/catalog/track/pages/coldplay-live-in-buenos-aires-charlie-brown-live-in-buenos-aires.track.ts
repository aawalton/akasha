import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresCharlieBrownLiveInBuenosAires = {
  id: "01a0b9ee-d300-722a-b3b8-42a96451c5d6",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-charlie-brown-live-in-buenos-aires",
  ownLength: 4.740433333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ksF058sVZ21EgQdRLbUyI",
      externalLink: "https://open.spotify.com/track/3ksF058sVZ21EgQdRLbUyI",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Charlie Brown - Live in Buenos Aires",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "charliebrownliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|284426",
  song: "song/coldplay-charlie-brown",
} as const satisfies Track
