import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsEverglow = {
  id: "01a0b9ee-d572-76b8-a529-a731d0fb6e8f",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-everglow",
  ownLength: 4.71155,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5qfZRNjt2TkHEL12r3sDEU",
      externalLink: "https://open.spotify.com/track/5qfZRNjt2TkHEL12r3sDEU",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Everglow",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "everglow|4gzpq5DPGxSnKTe4SA8HAU|282693",
  song: "song/coldplay-everglow",
} as const satisfies Track
