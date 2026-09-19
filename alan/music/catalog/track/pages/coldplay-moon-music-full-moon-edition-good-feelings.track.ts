import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionGoodFeelings = {
  id: "01a0b9ee-cac5-73bc-b525-6098b83ea147",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-good-feelings",
  ownLength: 3.623,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music-full-moon-edition"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4nmIcNQjEGez4zeJfm5I1F",
      externalLink: "https://open.spotify.com/track/4nmIcNQjEGez4zeJfm5I1F",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "GOOD FEELiNGS",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "3ZpEKRjHaHANcpk10u6Ntq", artistName: "Ayra Starr" },
  ],
  trackKey: "goodfeelings|3ZpEKRjHaHANcpk10u6Ntq,4gzpq5DPGxSnKTe4SA8HAU|217380",
  song: "song/coldplay-good-feelings",
} as const satisfies Track
