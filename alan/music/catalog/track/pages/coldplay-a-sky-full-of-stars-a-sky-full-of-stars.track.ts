import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayASkyFullOfStarsASkyFullOfStars = {
  id: "01a0b9ee-f790-7ee4-98b7-ff247e9da786",
  type: "page-type/track",
  slug: "coldplay-a-sky-full-of-stars-a-sky-full-of-stars",
  ownLength: 4.464433333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-sky-full-of-stars"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6HFbq7cewJ7rPiffV0ciil",
      externalLink: "https://open.spotify.com/track/6HFbq7cewJ7rPiffV0ciil",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Sky Full of Stars",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "askyfullofstars|4gzpq5DPGxSnKTe4SA8HAU|267866",
  song: "song/coldplay-a-sky-full-of-stars",
} as const satisfies Track
