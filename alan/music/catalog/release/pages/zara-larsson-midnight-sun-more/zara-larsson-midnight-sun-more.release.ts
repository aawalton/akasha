import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonMidnightSunMore = {
  id: "01a0aa7c-262a-7395-bc44-7336b5cd6ebb",
  type: "page-type/release",
  slug: "zara-larsson-midnight-sun-more",
  ownLength: 18.843133333333334,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2026-03-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2yIRG8O7NxQMFLvwxNiDk1",
      externalLink: "https://open.spotify.com/album/2yIRG8O7NxQMFLvwxNiDk1",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Midnight Sun (+ more)",
} as const satisfies Release
