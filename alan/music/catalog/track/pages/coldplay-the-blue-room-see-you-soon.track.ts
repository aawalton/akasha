import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTheBlueRoomSeeYouSoon = {
  id: "01a0b9ef-04d6-71f3-b92d-7cc6a508985a",
  type: "page-type/track",
  slug: "coldplay-the-blue-room-see-you-soon",
  ownLength: 2.8562166666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-the-blue-room"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1uKzAldJYlwje9HstlwTie",
      externalLink: "https://open.spotify.com/track/1uKzAldJYlwje9HstlwTie",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "See You Soon",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "seeyousoon|4gzpq5DPGxSnKTe4SA8HAU|171373",
} as const satisfies Track
