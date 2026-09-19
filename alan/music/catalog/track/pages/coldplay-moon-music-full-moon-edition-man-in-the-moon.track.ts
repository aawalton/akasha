import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionManInTheMoon = {
  id: "01a0b9ee-cc6f-78cd-b976-011ebdb8edeb",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-man-in-the-moon",
  ownLength: 3.91,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music-full-moon-edition"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5NPe4fAhaMwcho571EJXDi",
      externalLink: "https://open.spotify.com/track/5NPe4fAhaMwcho571EJXDi",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Man in The Moon",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "maninthemoon|4gzpq5DPGxSnKTe4SA8HAU|234600",
} as const satisfies Track
