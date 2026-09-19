import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTheBlueRoomDontPanic = {
  id: "01a0b9ef-04ac-7c1b-bcf6-7fb4fcda007f",
  type: "page-type/track",
  slug: "coldplay-the-blue-room-dont-panic",
  ownLength: 2.640433333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-the-blue-room"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0MbCcvzLYu3xq6OgEkSbhC",
      externalLink: "https://open.spotify.com/track/0MbCcvzLYu3xq6OgEkSbhC",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don't Panic",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "dontpanic|4gzpq5DPGxSnKTe4SA8HAU|158426",
  song: "song/coldplay-dont-panic",
} as const satisfies Track
