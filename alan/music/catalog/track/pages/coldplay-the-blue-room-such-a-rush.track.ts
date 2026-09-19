import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTheBlueRoomSuchARush = {
  id: "01a0b9ef-052b-75a5-8d3b-6216ab5c5fe2",
  type: "page-type/track",
  slug: "coldplay-the-blue-room-such-a-rush",
  ownLength: 4.9622166666666665,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-the-blue-room"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3c1NaLIIBoFof2nrDeUlc1",
      externalLink: "https://open.spotify.com/track/3c1NaLIIBoFof2nrDeUlc1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Such a Rush",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "sucharush|4gzpq5DPGxSnKTe4SA8HAU|297733",
  song: "song/coldplay-such-a-rush",
} as const satisfies Track
