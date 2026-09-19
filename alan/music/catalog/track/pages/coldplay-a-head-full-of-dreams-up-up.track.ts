import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsUpUp = {
  id: "01a0b9ee-d688-742d-bf3f-aef55055be3c",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-up-up",
  ownLength: 6.755333333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "31L9yLXSj6LpCFupyMV6CR",
      externalLink: "https://open.spotify.com/track/31L9yLXSj6LpCFupyMV6CR",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Up&Up",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "upup|4gzpq5DPGxSnKTe4SA8HAU|405320",
  song: "song/coldplay-up-up",
} as const satisfies Track
