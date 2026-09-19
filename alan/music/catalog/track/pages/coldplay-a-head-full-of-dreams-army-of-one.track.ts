import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsArmyOfOne = {
  id: "01a0b9ee-d60d-78da-94b3-c4eb86bfb47c",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-army-of-one",
  ownLength: 6.280433333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4giCxIFPZNQIP4bIZM4sqH",
      externalLink: "https://open.spotify.com/track/4giCxIFPZNQIP4bIZM4sqH",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Army of One",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "armyofone|4gzpq5DPGxSnKTe4SA8HAU|376826",
} as const satisfies Track
