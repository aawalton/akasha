import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012ClocksLive = {
  id: "01a0b9ee-db6a-7e2a-97fa-201df8161040",
  type: "page-type/track",
  slug: "coldplay-live-2012-clocks-live",
  ownLength: 4.749333333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2012"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7LIQNY8P7ZGxilKVX88MF1",
      externalLink: "https://open.spotify.com/track/7LIQNY8P7ZGxilKVX88MF1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Clocks - Live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "clockslive|4gzpq5DPGxSnKTe4SA8HAU|284960",
} as const satisfies Track
