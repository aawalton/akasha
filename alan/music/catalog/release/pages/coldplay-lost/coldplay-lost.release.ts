import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayLost = {
  id: "01a0676a-d723-7067-8df1-b48a6ab724c5",
  type: "page-type/release",
  slug: "coldplay-lost",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2008-11-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3J6zaHMhIAWJtxhWpOdLBZ",
      externalLink: "https://open.spotify.com/album/3J6zaHMhIAWJtxhWpOdLBZ",
    },
  ],
  title: "Lost!",
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
