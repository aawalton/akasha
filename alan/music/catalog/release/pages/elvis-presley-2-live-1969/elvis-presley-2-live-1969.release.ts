import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2Live1969 = {
  id: "01a0676a-d723-703d-9502-fe4869fb6544",
  type: "page-type/release",
  slug: "elvis-presley-2-live-1969",
  title: "Live 1969",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 797.487,
  ownProgress: 797.487,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-08-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3s7da3LPVn5N1yobOcAen0",
      externalLink: "https://open.spotify.com/album/3s7da3LPVn5N1yobOcAen0",
    },
  ],
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-09-15T16:35:10.000Z",
} as const satisfies Release
