import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayAmico = {
  id: "01a0676a-d717-700b-bc52-5e9be04c01e2",
  type: "release",
  slug: "green-day-amico",
  title: "Amico",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 2.4665,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  rank: "C",
  publishedAt: "2020-10-16",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3jX84c9YrJYvB7nrul5fbN",
      externalLink: "https://open.spotify.com/album/3jX84c9YrJYvB7nrul5fbN",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
