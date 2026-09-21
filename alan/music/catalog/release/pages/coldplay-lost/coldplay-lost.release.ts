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
} as const satisfies Release
