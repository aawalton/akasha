import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2ADateWithElvis2 = {
  id: "01a0676a-d715-7020-8fc7-413dec624983",
  type: "page-type/release",
  slug: "elvis-presley-2-a-date-with-elvis-2",
  title: "A Date with Elvis",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 23.141233,
  ownProgress: 23.141233,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-06-16",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6YbFKatqJ3PYpMv7VXShBO",
      externalLink: "https://open.spotify.com/album/6YbFKatqJ3PYpMv7VXShBO",
    },
  ],
} as const satisfies Release
