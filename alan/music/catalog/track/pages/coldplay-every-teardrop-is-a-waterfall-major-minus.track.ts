import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEveryTeardropIsAWaterfallMajorMinus = {
  id: "01a0b9ee-fa37-7cfa-895b-dd28802a855b",
  type: "page-type/track",
  slug: "coldplay-every-teardrop-is-a-waterfall-major-minus",
  ownLength: 3.5047333333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-every-teardrop-is-a-waterfall"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6hREuBpEXpgXosiUuFQfqd",
      externalLink: "https://open.spotify.com/track/6hREuBpEXpgXosiUuFQfqd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Major Minus",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "majorminus|4gzpq5DPGxSnKTe4SA8HAU|210284",
  song: "song/coldplay-major-minus",
} as const satisfies Track
