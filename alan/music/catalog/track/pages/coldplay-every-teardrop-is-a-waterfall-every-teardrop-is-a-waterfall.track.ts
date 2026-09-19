import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEveryTeardropIsAWaterfallEveryTeardropIsAWaterfall = {
  id: "01a0b9ee-fa10-7701-949f-36d8d3093065",
  type: "page-type/track",
  slug: "coldplay-every-teardrop-is-a-waterfall-every-teardrop-is-a-waterfall",
  ownLength: 4.05,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-every-teardrop-is-a-waterfall"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6P5g398JKsPAYSt4NKqsrX",
      externalLink: "https://open.spotify.com/track/6P5g398JKsPAYSt4NKqsrX",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Every Teardrop Is a Waterfall",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "everyteardropisawaterfall|4gzpq5DPGxSnKTe4SA8HAU|243000",
  song: "song/coldplay-every-teardrop-is-a-waterfall",
} as const satisfies Track
