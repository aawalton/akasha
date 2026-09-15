import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2KingCreole = {
  id: "01a0676a-d722-7045-b995-b063bc53b79b",
  type: "page-type/release",
  slug: "elvis-presley-2-king-creole",
  title: "King Creole",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 23.4695,
  ownProgress: 23.4695,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1958-09-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7hdMmwpZmRf8efyh7G2pOl",
      externalLink: "https://open.spotify.com/album/7hdMmwpZmRf8efyh7G2pOl",
    },
  ],
} as const satisfies Release
