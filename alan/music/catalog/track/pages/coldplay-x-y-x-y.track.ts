import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYXY = {
  id: "01a0b9ee-e49b-7f7a-8695-27d0107146dd",
  type: "page-type/track",
  slug: "coldplay-x-y-x-y",
  ownLength: 4.569583333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-x-y"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2rxp56vVQp1zzumJ0eHLmw",
      externalLink: "https://open.spotify.com/track/2rxp56vVQp1zzumJ0eHLmw",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "X&Y",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "xy|4gzpq5DPGxSnKTe4SA8HAU|274175",
} as const satisfies Track
