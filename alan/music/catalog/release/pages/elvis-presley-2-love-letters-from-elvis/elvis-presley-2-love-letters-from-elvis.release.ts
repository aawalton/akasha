import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2LoveLettersFromElvis = {
  id: "01a0676a-d723-706d-92a5-b2d9c49413e2",
  type: "release",
  slug: "elvis-presley-2-love-letters-from-elvis",
  title: "Love Letters from Elvis",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 40.41415,
  ownProgress: 40.41415,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1971-06-16",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3kf5iEHqvuKch85eAvWrGO",
      externalLink: "https://open.spotify.com/album/3kf5iEHqvuKch85eAvWrGO",
    },
  ],
} as const satisfies Release
