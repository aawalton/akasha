import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionAeterna = {
  id: "01a0b9ee-cb36-72a0-82a6-1a7d7350e20c",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-aeterna",
  ownLength: 4.217133333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music-full-moon-edition"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Q3dNGUbRNp0Cn9ayZQJl0",
      externalLink: "https://open.spotify.com/track/3Q3dNGUbRNp0Cn9ayZQJl0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "AETERNA",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "aeterna|4gzpq5DPGxSnKTe4SA8HAU|253028",
} as const satisfies Track
