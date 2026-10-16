import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexWarrenYardSale = {
  id: "01a0676a-d731-7045-a0eb-b6521dfdb38b",
  type: "page-type/release",
  slug: "alex-warren-yard-sale",
  title: "Yard Sale",
  partOfCollections: ["artist/alex-warren"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-11-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6NrKSg2op9PLJI9BjpwPXe",
      externalLink: "https://open.spotify.com/album/6NrKSg2op9PLJI9BjpwPXe",
      lastSyncedAt: "2026-01-14",
    },
  ],
  createdAt: "2026-09-03T13:17:30.289Z",
  updatedAt: "2026-10-16T14:00:31.585Z",
} as const satisfies Release
