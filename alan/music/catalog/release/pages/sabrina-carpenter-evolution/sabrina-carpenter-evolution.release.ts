import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterEvolution = {
  id: "01a0676a-d71d-7047-abc4-0f252832fbb9",
  type: "page-type/release",
  slug: "sabrina-carpenter-evolution",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2016-10-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7iOAJaGBmk67o337zaqt0R",
      externalLink: "https://open.spotify.com/album/7iOAJaGBmk67o337zaqt0R",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "EVOLution",
} as const satisfies Release
