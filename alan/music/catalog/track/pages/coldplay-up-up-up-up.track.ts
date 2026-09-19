import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayUpUpUpUp = {
  id: "01a0b9ee-f4cf-7a55-a995-e32fdbf863c5",
  type: "page-type/track",
  slug: "coldplay-up-up-up-up",
  ownLength: 3.9682166666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-up-up"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4a8pP5X2lxwU5aprY44jLn",
      externalLink: "https://open.spotify.com/track/4a8pP5X2lxwU5aprY44jLn",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Up&Up",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "upup|4gzpq5DPGxSnKTe4SA8HAU|238093",
  song: "song/coldplay-up-up",
} as const satisfies Track
