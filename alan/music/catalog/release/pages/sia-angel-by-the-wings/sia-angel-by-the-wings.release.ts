import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaAngelByTheWings = {
  id: "01a0676a-d717-701c-99af-290caf4814e3",
  type: "page-type/release",
  slug: "sia-angel-by-the-wings",
  title: "Angel By The Wings",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 5.32,
  ownProgress: 5.32,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-12-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1diZXhFKWvBHJg6YMEZ74b",
      externalLink: "https://open.spotify.com/album/1diZXhFKWvBHJg6YMEZ74b",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.263Z",
  updatedAt: "2026-09-15T16:38:50.000Z",
} as const satisfies Release
