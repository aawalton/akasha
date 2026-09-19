import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionAllMyLove = {
  id: "01a0b9ee-cb57-7c41-a1fd-3a94304d2bd0",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-all-my-love",
  ownLength: 3.7107833333333335,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music-full-moon-edition"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1mAMlMxsUBQ4qqQ8FVdjt8",
      externalLink: "https://open.spotify.com/track/1mAMlMxsUBQ4qqQ8FVdjt8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "ALL MY LOVE",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "allmylove|4gzpq5DPGxSnKTe4SA8HAU|222647",
  song: "song/coldplay-all-my-love",
} as const satisfies Track
