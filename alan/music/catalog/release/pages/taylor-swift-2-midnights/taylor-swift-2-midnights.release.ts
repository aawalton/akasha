import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2Midnights = {
  id: "01a0676a-d724-7065-b42b-23dd8c25dc39",
  type: "page-type/release",
  slug: "taylor-swift-2-midnights",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2022-10-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "151w1FgRZfnKZA9FEcg9Z3",
      externalLink: "https://open.spotify.com/album/151w1FgRZfnKZA9FEcg9Z3",
    },
  ],
  title: "Midnights",
} as const satisfies Release
