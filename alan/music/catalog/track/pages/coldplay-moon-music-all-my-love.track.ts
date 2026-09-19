import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicAllMyLove = {
  id: "01a0b9ee-c9e9-7648-9e9d-58fc68b5d746",
  type: "page-type/track",
  slug: "coldplay-moon-music-all-my-love",
  ownLength: 3.7107833333333335,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6iYxkBHyMpsgVxUgfy5fSx",
      externalLink: "https://open.spotify.com/track/6iYxkBHyMpsgVxUgfy5fSx",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "ALL MY LOVE",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "allmylove|4gzpq5DPGxSnKTe4SA8HAU|222647",
  song: "song/coldplay-all-my-love",
} as const satisfies Track
