import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2Hourglass = {
  id: "01a0676a-d720-7066-8171-6d8c552cf60d",
  type: "page-type/release",
  slug: "james-taylor-2-hourglass",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "1997-05-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3E7Sj3kKbxY1Tsp7U0SKQi",
      externalLink: "https://open.spotify.com/album/3E7Sj3kKbxY1Tsp7U0SKQi",
    },
  ],
  title: "Hourglass",
} as const satisfies Release
