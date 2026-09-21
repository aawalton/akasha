import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterWhy = {
  id: "01a0676a-d731-7013-a023-6f6e2e69422c",
  type: "page-type/release",
  slug: "sabrina-carpenter-why",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2017-07-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "55QjSqhCofvsx559gCIMI7",
      externalLink: "https://open.spotify.com/album/55QjSqhCofvsx559gCIMI7",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Why",
} as const satisfies Release
