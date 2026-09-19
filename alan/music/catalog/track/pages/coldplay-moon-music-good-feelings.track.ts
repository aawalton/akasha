import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicGoodFeelings = {
  id: "01a0b9ee-c94c-7b2d-abd2-f590ff6ab20a",
  type: "page-type/track",
  slug: "coldplay-moon-music-good-feelings",
  ownLength: 3.623,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "65wzicJctsW9GwnTnLWxQO",
      externalLink: "https://open.spotify.com/track/65wzicJctsW9GwnTnLWxQO",
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
