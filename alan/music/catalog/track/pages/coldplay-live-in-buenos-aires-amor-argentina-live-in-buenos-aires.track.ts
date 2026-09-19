import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresAmorArgentinaLiveInBuenosAires = {
  id: "01a0b9ee-d43d-720e-befa-ca0e4f53a90a",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-amor-argentina-live-in-buenos-aires",
  ownLength: 5.27,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  position: 20,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1rAZrYT0Ad4F1RiDaxYknE",
      externalLink: "https://open.spotify.com/track/1rAZrYT0Ad4F1RiDaxYknE",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Amor Argentina - Live in Buenos Aires",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "amorargentinaliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|316200",
  song: "song/coldplay-amor-argentina",
} as const satisfies Track
