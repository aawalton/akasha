import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012PrincessOfChinaLive = {
  id: "01a0b9ee-da6f-741c-b526-d0625f5656c3",
  type: "page-type/track",
  slug: "coldplay-live-2012-princess-of-china-live",
  ownLength: 3.816,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2012"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0t1nm5TmszvLLVAOLiOrH8",
      externalLink: "https://open.spotify.com/track/0t1nm5TmszvLLVAOLiOrH8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Princess of China - Live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "princessofchinalive|4gzpq5DPGxSnKTe4SA8HAU|228960",
} as const satisfies Track
