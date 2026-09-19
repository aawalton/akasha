import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverglowEverglowEdit = {
  id: "01a0b9ee-f451-733d-84d2-52a98b6ac9a2",
  type: "page-type/track",
  slug: "coldplay-everglow-everglow-edit",
  ownLength: 3.7917666666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-everglow"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6aG68QSwv0hgNTq90I2GOE",
      externalLink: "https://open.spotify.com/track/6aG68QSwv0hgNTq90I2GOE",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Everglow - Edit",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "everglowedit|4gzpq5DPGxSnKTe4SA8HAU|227506",
} as const satisfies Track
