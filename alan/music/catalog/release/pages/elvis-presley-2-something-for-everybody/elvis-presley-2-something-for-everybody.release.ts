import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2SomethingForEverybody = {
  id: "01a0676a-d729-7059-8527-b9fa5beeb1cb",
  type: "release",
  slug: "elvis-presley-2-something-for-everybody",
  title: "Something for Everybody",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 26.742617,
  ownProgress: 26.742617,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-06-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2gsQtdVoSpl5cD4rcRDi3y",
      externalLink: "https://open.spotify.com/album/2gsQtdVoSpl5cD4rcRDi3y",
    },
  ],
} as const satisfies Release
