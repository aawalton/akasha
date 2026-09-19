import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionAngelsong = {
  id: "01a0b9ee-cc2c-702d-b9d3-4a652715eede",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-angelsong",
  ownLength: 4.365083333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music-full-moon-edition"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6xXocHy6Oux7H3MSDJd0mn",
      externalLink: "https://open.spotify.com/track/6xXocHy6Oux7H3MSDJd0mn",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Angelsong",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "angelsong|4gzpq5DPGxSnKTe4SA8HAU|261905",
  song: "song/coldplay-angelsong",
} as const satisfies Track
