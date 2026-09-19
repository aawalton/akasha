import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsAHeadFullOfDreams = {
  id: "01a0b9ee-d4fd-7055-bc91-507c097272a0",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-a-head-full-of-dreams",
  ownLength: 3.72955,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6f49kbOuQSOsStBpyGvQfA",
      externalLink: "https://open.spotify.com/track/6f49kbOuQSOsStBpyGvQfA",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Head Full of Dreams",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "aheadfullofdreams|4gzpq5DPGxSnKTe4SA8HAU|223773",
} as const satisfies Track
