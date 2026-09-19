import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresAHeadFullOfDreamsLiveInBuenosAires = {
  id: "01a0b9ee-d152-7499-84e8-bd9c3e893a41",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-a-head-full-of-dreams-live-in-buenos-aires",
  ownLength: 4.985333333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5H8lr4az4Vo3LloH67yVRt",
      externalLink: "https://open.spotify.com/track/5H8lr4az4Vo3LloH67yVRt",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Head Full of Dreams - Live in Buenos Aires",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "aheadfullofdreamsliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|299120",
  song: "song/coldplay-a-head-full-of-dreams",
} as const satisfies Track
