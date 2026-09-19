import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionAllMyLoveLiveInDublin = {
  id: "01a0b9ee-ccbd-74f6-91a2-8d77db174e60",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-all-my-love-live-in-dublin",
  ownLength: 4.10535,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music-full-moon-edition"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3aaXb0yHa5voqqAXALjUJm",
      externalLink: "https://open.spotify.com/track/3aaXb0yHa5voqqAXALjUJm",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All My Love - Live in Dublin",
  trackType: "live",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "allmyloveliveindublin|4gzpq5DPGxSnKTe4SA8HAU|246321",
  song: "song/coldplay-all-my-love",
} as const satisfies Track
