import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const justinTimberlakeDrown = {
  id: "01a0676a-d71c-703d-b469-25e083efcf7a",
  type: "release",
  slug: "justin-timberlake-drown",
  title: "Drown",
  partOfCollections: ["artist/justin-timberlake"],
  position: 0,
  ownLength: 4.335333,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-02-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5PpH5XpQ59g6CB399oKkVA",
      externalLink: "https://open.spotify.com/album/5PpH5XpQ59g6CB399oKkVA",
    },
  ],
} as const satisfies Release
