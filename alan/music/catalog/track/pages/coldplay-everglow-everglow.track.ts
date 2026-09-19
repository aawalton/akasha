import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverglowEverglow = {
  id: "01a0b9ee-f47d-75c7-9aae-a85816361394",
  type: "page-type/track",
  slug: "coldplay-everglow-everglow",
  ownLength: 5.03,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-everglow"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6r2BFEIErNwG0owW4rOQB8",
      externalLink: "https://open.spotify.com/track/6r2BFEIErNwG0owW4rOQB8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Everglow",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "everglow|4gzpq5DPGxSnKTe4SA8HAU|301800",
} as const satisfies Track
