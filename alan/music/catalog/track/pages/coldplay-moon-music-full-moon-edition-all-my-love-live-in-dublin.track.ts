import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionAllMyLoveLiveInDublin = {
  id: "01a0b9ee-ccbd-74f6-91a2-8d77db174e60",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-all-my-love-live-in-dublin",
  ownLength: 4.10535,
  ownProgress: 4.10535,
  partOfCollections: ["release/coldplay-moon-music-full-moon-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "All My Love - Live in Dublin",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "allmyloveliveindublin|4gzpq5DPGxSnKTe4SA8HAU|246321",
  song: "song/coldplay-all-my-love",
  carriedBy: [
    {
      release: "release/coldplay-moon-music-full-moon-edition",
      discNumber: 2,
      position: 9,
      externalId: "3aaXb0yHa5voqqAXALjUJm",
      externalLink: "https://open.spotify.com/track/3aaXb0yHa5voqqAXALjUJm",
    },
  ],
} as const satisfies Track
