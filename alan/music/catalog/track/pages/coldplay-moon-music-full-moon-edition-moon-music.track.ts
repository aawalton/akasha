import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionMoonMusic = {
  id: "01a0b9ee-ca34-7b3b-89c2-6f415a7480a5",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-moon-music",
  ownLength: 4.607933333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music-full-moon-edition"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4mEWgqYOEiygF1mzEn901R",
      externalLink: "https://open.spotify.com/track/4mEWgqYOEiygF1mzEn901R",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "MOON MUSiC",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "7yxi31szvlbwvKq9dYOmFI", artistName: "Jon Hopkins" },
  ],
  trackKey: "moonmusic|4gzpq5DPGxSnKTe4SA8HAU,7yxi31szvlbwvKq9dYOmFI|276476",
  song: "song/coldplay-moon-music",
} as const satisfies Track
