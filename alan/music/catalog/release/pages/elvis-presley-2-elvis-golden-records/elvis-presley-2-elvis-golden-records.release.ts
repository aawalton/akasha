import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2ElvisGoldenRecords = {
  id: "01a0676a-d71c-7072-82ff-f6cd7b69389d",
  type: "release",
  slug: "elvis-presley-2-elvis-golden-records",
  title: "Elvis' Golden Records",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 33.267283,
  ownProgress: 33.267283,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1958-03-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0C3t1htEDTFKcg7F2rNbek",
      externalLink: "https://open.spotify.com/album/0C3t1htEDTFKcg7F2rNbek",
    },
  ],
} as const satisfies Release
