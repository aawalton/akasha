import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeEverydayLife = {
  id: "01a0b9ee-d12b-7012-a519-813e6aaa2f52",
  type: "page-type/track",
  slug: "coldplay-everyday-life-everyday-life",
  ownLength: 4.308883333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-everyday-life"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0h9fnCSnbUgOEgibnQByFv",
      externalLink: "https://open.spotify.com/track/0h9fnCSnbUgOEgibnQByFv",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Everyday Life",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "everydaylife|4gzpq5DPGxSnKTe4SA8HAU|258533",
} as const satisfies Track
