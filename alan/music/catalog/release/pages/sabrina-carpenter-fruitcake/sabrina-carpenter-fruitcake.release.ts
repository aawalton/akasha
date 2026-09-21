import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterFruitcake = {
  id: "01a0676a-d71e-7044-b3ef-71ee16c9300d",
  type: "page-type/release",
  slug: "sabrina-carpenter-fruitcake",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2023-11-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7EisdwWcodpmHxgpGVE5Pg",
      externalLink: "https://open.spotify.com/album/7EisdwWcodpmHxgpGVE5Pg",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "fruitcake",
} as const satisfies Release
