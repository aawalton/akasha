import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeChampionOfTheWorld = {
  id: "01a0b9ee-d102-7a1d-a8a3-c646c25873c8",
  type: "page-type/track",
  slug: "coldplay-everyday-life-champion-of-the-world",
  ownLength: 4.292433333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-everyday-life"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6mf7BNgXs8JipPr2QILnyN",
      externalLink: "https://open.spotify.com/track/6mf7BNgXs8JipPr2QILnyN",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Champion Of The World",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "championoftheworld|4gzpq5DPGxSnKTe4SA8HAU|257546",
} as const satisfies Track
