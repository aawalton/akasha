import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTheBlueRoomBiggerStronger = {
  id: "01a0b9ef-0486-73e8-816e-1a4e3ce12e2b",
  type: "page-type/track",
  slug: "coldplay-the-blue-room-bigger-stronger",
  ownLength: 4.818883333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-the-blue-room"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5DJtltTQQvcFhP65SFqKxq",
      externalLink: "https://open.spotify.com/track/5DJtltTQQvcFhP65SFqKxq",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bigger Stronger",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "biggerstronger|4gzpq5DPGxSnKTe4SA8HAU|289133",
} as const satisfies Track
