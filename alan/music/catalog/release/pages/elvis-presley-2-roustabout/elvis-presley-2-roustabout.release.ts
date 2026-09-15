import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2Roustabout = {
  id: "01a0676a-d728-7023-9b19-203cf117bb47",
  type: "page-type/release",
  slug: "elvis-presley-2-roustabout",
  title: "Roustabout",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 20.384833,
  ownProgress: 20.384833,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1964-10-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7wxRGT2I9DKlMUo62cLuoV",
      externalLink: "https://open.spotify.com/album/7wxRGT2I9DKlMUo62cLuoV",
    },
  ],
} as const satisfies Release
