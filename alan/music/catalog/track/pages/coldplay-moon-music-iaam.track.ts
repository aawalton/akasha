import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicIaam = {
  id: "01a0b9ee-c998-714a-b335-cee1633798bd",
  type: "page-type/track",
  slug: "coldplay-moon-music-iaam",
  ownLength: 3.0561833333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1uwmf1x4LQLGv1P1xjJFYk",
      externalLink: "https://open.spotify.com/track/1uwmf1x4LQLGv1P1xjJFYk",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "iAAM",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "iaam|4gzpq5DPGxSnKTe4SA8HAU|183371",
} as const satisfies Track
