import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayParachutesTrouble = {
  id: "01a0b9ee-e9ee-709f-954d-5df354058447",
  type: "page-type/track",
  slug: "coldplay-parachutes-trouble",
  ownLength: 4.5571,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-parachutes"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0R8P9KfGJCDULmlEoBagcO",
      externalLink: "https://open.spotify.com/track/0R8P9KfGJCDULmlEoBagcO",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Trouble",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "trouble|4gzpq5DPGxSnKTe4SA8HAU|273426",
  song: "song/coldplay-trouble",
} as const satisfies Track
