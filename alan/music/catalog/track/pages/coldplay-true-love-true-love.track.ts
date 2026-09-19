import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTrueLoveTrueLove = {
  id: "01a0b9ee-f5c3-7f55-ab70-a9640ab59191",
  type: "page-type/track",
  slug: "coldplay-true-love-true-love",
  ownLength: 4.1,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-true-love"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3HOe5HB3E9tmz9ocHwsPgP",
      externalLink: "https://open.spotify.com/track/3HOe5HB3E9tmz9ocHwsPgP",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "True Love",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "truelove|4gzpq5DPGxSnKTe4SA8HAU|246000",
  song: "song/coldplay-true-love",
} as const satisfies Track
