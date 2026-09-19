import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYLow = {
  id: "01a0b9ee-e505-7c54-b566-7049aa2580c5",
  type: "page-type/track",
  slug: "coldplay-x-y-low",
  ownLength: 5.535066666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-x-y"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1BBtng1KOF0JuC6bSNgGmp",
      externalLink: "https://open.spotify.com/track/1BBtng1KOF0JuC6bSNgGmp",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Low",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "low|4gzpq5DPGxSnKTe4SA8HAU|332104",
  song: "song/coldplay-low",
} as const satisfies Track
