import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterEspressoEp = {
  id: "01a0676a-d71d-7022-9fb0-e1051ba846ec",
  type: "page-type/release",
  slug: "sabrina-carpenter-espresso-ep",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2024-05-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2yIhXdfQKrzp7ENGxxI92c",
      externalLink: "https://open.spotify.com/album/2yIhXdfQKrzp7ENGxxI92c",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Espresso EP",
} as const satisfies Release
