import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkLivingThings = {
  id: "01a0676a-d723-705a-a9a7-a8f0e81f0930",
  type: "page-type/release",
  slug: "linkin-park-living-things",
  title: "LIVING THINGS",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 37.0575,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2012-06-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4XHIjbhjRmqWlosjj5rqSI",
      externalLink: "https://open.spotify.com/album/4XHIjbhjRmqWlosjj5rqSI",
    },
  ],
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-09-15T16:37:53.000Z",
} as const satisfies Release
