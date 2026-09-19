import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012ParadiseLive = {
  id: "01a0b9ee-db14-7a66-a50e-eab64e5b7612",
  type: "page-type/track",
  slug: "coldplay-live-2012-paradise-live",
  ownLength: 5.534666666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2012"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1lWLwMV3peo5fJp5hHRCHS",
      externalLink: "https://open.spotify.com/track/1lWLwMV3peo5fJp5hHRCHS",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Paradise - Live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "paradiselive|4gzpq5DPGxSnKTe4SA8HAU|332080",
  song: "song/coldplay-paradise",
} as const satisfies Track
