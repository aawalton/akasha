import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYTheHardestPart = {
  id: "01a0b9ee-e52e-7ce7-9071-ff9355086ef8",
  type: "page-type/track",
  slug: "coldplay-x-y-the-hardest-part",
  ownLength: 4.381333333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-x-y"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Tw9JYF9HOuPRyccNWMgwf",
      externalLink: "https://open.spotify.com/track/4Tw9JYF9HOuPRyccNWMgwf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Hardest Part",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "thehardestpart|4gzpq5DPGxSnKTe4SA8HAU|262880",
  song: "song/coldplay-the-hardest-part",
} as const satisfies Track
