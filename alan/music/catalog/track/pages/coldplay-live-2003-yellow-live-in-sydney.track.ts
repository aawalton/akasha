import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2003YellowLiveInSydney = {
  id: "01a0b9ee-e6fe-7584-a58d-ba66d295756b",
  type: "page-type/track",
  slug: "coldplay-live-2003-yellow-live-in-sydney",
  ownLength: 5.6111,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2003"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6cR5WracqJzYoH80lSKW0L",
      externalLink: "https://open.spotify.com/track/6cR5WracqJzYoH80lSKW0L",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Yellow - Live in Sydney",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "yellowliveinsydney|4gzpq5DPGxSnKTe4SA8HAU|336666",
  song: "song/coldplay-yellow",
} as const satisfies Track
