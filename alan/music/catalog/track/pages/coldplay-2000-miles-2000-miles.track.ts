import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplay2000Miles2000Miles = {
  id: "01a0b9ef-004a-7937-8d10-49d325b633e1",
  type: "page-type/track",
  slug: "coldplay-2000-miles-2000-miles",
  ownLength: 3.26195,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-2000-miles"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5v1SC5d3F8VHwqkXx53f7d",
      externalLink: "https://open.spotify.com/track/5v1SC5d3F8VHwqkXx53f7d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "2000 Miles",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "2000miles|4gzpq5DPGxSnKTe4SA8HAU|195717",
  song: "song/coldplay-2000-miles",
} as const satisfies Track
