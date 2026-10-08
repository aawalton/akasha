import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioAccident = {
  id: "01a0676a-d715-704d-85eb-57156a1566ca",
  type: "page-type/release",
  slug: "jessica-baio-accident",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2025-10-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1txZIezoR87PmBEO6QPTqK",
      externalLink: "https://open.spotify.com/album/1txZIezoR87PmBEO6QPTqK",
      lastSyncedAt: "2025-10-30",
    },
  ],
  title: "accident",
  createdAt: "2026-09-03T13:17:30.261Z",
  updatedAt: "2026-09-21T23:00:38.000Z",
} as const satisfies Release
