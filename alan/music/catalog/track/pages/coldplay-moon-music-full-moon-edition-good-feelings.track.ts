import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionGoodFeelings = {
  id: "01a0b9ee-cac5-73bc-b525-6098b83ea147",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-good-feelings",
  ownLength: 3.623,
  ownProgress: 3.623,
  partOfCollections: [
    "release/coldplay-moon-music-full-moon-edition",
    "release/coldplay-moon-music",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "GOOD FEELiNGS",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }, { artistName: "Ayra Starr" }],
  trackKey: "goodfeelings|3ZpEKRjHaHANcpk10u6Ntq,4gzpq5DPGxSnKTe4SA8HAU|217380",
  song: "song/coldplay-good-feelings",
  carriedBy: [
    {
      release: "release/coldplay-moon-music",
      discNumber: 1,
      position: 5,
      externalId: "65wzicJctsW9GwnTnLWxQO",
      externalLink: "https://open.spotify.com/track/65wzicJctsW9GwnTnLWxQO",
    },
    {
      release: "release/coldplay-moon-music-full-moon-edition",
      discNumber: 1,
      position: 5,
      externalId: "4nmIcNQjEGez4zeJfm5I1F",
      externalLink: "https://open.spotify.com/track/4nmIcNQjEGez4zeJfm5I1F",
    },
  ],
} as const satisfies Track
