import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTheHardestPartTheHardestPart = {
  id: "01a0b9ee-fd79-79d7-b96b-ab8f8cd3204b",
  type: "page-type/track",
  slug: "coldplay-the-hardest-part-the-hardest-part",
  ownLength: 4.381333333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-the-hardest-part"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6VfvwCxKaNnuVU4Mugu5k1",
      externalLink: "https://open.spotify.com/track/6VfvwCxKaNnuVU4Mugu5k1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Hardest Part",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "thehardestpart|4gzpq5DPGxSnKTe4SA8HAU|262880",
} as const satisfies Track
