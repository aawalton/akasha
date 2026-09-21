import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterANonsenseChristmas = {
  id: "01a0676a-d715-7038-ac12-715067ddef5a",
  type: "page-type/release",
  slug: "sabrina-carpenter-a-nonsense-christmas",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2022-12-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2D2boDrCPl6idtxpJF6r38",
      externalLink: "https://open.spotify.com/album/2D2boDrCPl6idtxpJF6r38",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "A Nonsense Christmas",
} as const satisfies Release
