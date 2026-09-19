import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeGuns = {
  id: "01a0b9ee-d013-75bd-b68b-3a921e85e5fb",
  type: "page-type/track",
  slug: "coldplay-everyday-life-guns",
  ownLength: 1.918,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-everyday-life"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6VzRvCbolqcUswaSPm48rI",
      externalLink: "https://open.spotify.com/track/6VzRvCbolqcUswaSPm48rI",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Guns",
  discNumber: 2,
  explicit: true,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "guns|4gzpq5DPGxSnKTe4SA8HAU|115080",
} as const satisfies Track
