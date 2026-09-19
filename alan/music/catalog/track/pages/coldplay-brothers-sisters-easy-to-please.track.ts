import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayBrothersSistersEasyToPlease = {
  id: "01a0b9ef-0581-7ba8-81e9-3c0aa73e4d6f",
  type: "page-type/track",
  slug: "coldplay-brothers-sisters-easy-to-please",
  ownLength: 3.0326666666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-brothers-sisters"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6KHZ9SElsSmjQI7B9D0e4P",
      externalLink: "https://open.spotify.com/track/6KHZ9SElsSmjQI7B9D0e4P",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Easy To Please",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "easytoplease|4gzpq5DPGxSnKTe4SA8HAU|181960",
} as const satisfies Track
