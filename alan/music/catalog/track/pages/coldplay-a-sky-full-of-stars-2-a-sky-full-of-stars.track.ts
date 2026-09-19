import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayASkyFullOfStars2ASkyFullOfStars = {
  id: "01a0b9ee-f642-787c-b58d-c1e044fd6fb1",
  type: "page-type/track",
  slug: "coldplay-a-sky-full-of-stars-2-a-sky-full-of-stars",
  ownLength: 3.93965,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-sky-full-of-stars-2"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2nzI2futOM8isgXNKAlQ1m",
      externalLink: "https://open.spotify.com/track/2nzI2futOM8isgXNKAlQ1m",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Sky Full of Stars",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "askyfullofstars|4gzpq5DPGxSnKTe4SA8HAU|236379",
} as const satisfies Track
