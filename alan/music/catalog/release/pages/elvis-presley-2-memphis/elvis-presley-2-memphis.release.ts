import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2Memphis = {
  id: "01a0676a-d724-704b-b92d-881bd16abc24",
  type: "page-type/release",
  slug: "elvis-presley-2-memphis",
  title: "MEMPHIS",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 336.85275,
  ownProgress: 336.85275,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2024-08-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "27naxukVSz1Z1OWCXjwSky",
      externalLink: "https://open.spotify.com/album/27naxukVSz1Z1OWCXjwSky",
    },
  ],
} as const satisfies Release
