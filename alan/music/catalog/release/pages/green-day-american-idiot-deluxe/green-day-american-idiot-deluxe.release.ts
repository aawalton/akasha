import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayAmericanIdiotDeluxe = {
  id: "01a0676a-d717-7007-96a0-1a38a6219ec9",
  type: "release",
  slug: "green-day-american-idiot-deluxe",
  title: "American Idiot (Deluxe)",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 65.22195,
  ownProgress: 65.22195,
  unit: "unit/minutes",
  status: "completed",
  rank: "C",
  publishedAt: "2004-09-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Qhn2FpGWmTjCuntF09j7g",
      externalLink: "https://open.spotify.com/album/5Qhn2FpGWmTjCuntF09j7g",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
