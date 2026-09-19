import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionOneWorld = {
  id: "01a0b9ee-cb79-78cb-ae79-35ac5a863467",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-one-world",
  ownLength: 6.794266666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music-full-moon-edition"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "66KIWk0JIZDOAfsYDCosVP",
      externalLink: "https://open.spotify.com/track/66KIWk0JIZDOAfsYDCosVP",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "ONE WORLD",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "oneworld|4gzpq5DPGxSnKTe4SA8HAU|407656",
} as const satisfies Track
