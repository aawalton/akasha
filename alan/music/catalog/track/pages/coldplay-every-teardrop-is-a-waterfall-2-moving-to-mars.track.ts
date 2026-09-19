import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEveryTeardropIsAWaterfall2MovingToMars = {
  id: "01a0b9ee-f9e6-77d6-bf3a-33f69df450f9",
  type: "page-type/track",
  slug: "coldplay-every-teardrop-is-a-waterfall-2-moving-to-mars",
  ownLength: 4.31455,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-every-teardrop-is-a-waterfall-2"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0kuv7BqWNDprDao3Tb5flN",
      externalLink: "https://open.spotify.com/track/0kuv7BqWNDprDao3Tb5flN",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Moving to Mars",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "movingtomars|4gzpq5DPGxSnKTe4SA8HAU|258873",
  song: "song/coldplay-moving-to-mars",
} as const satisfies Track
