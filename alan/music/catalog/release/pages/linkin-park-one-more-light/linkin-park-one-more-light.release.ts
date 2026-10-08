import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkOneMoreLight = {
  id: "01a0676a-d726-7031-a8dd-dcb23669f469",
  type: "page-type/release",
  slug: "linkin-park-one-more-light",
  title: "One More Light",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 35.37795,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-05-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Eevxp2BCbWq25ZdiXRwYd",
      externalLink: "https://open.spotify.com/album/5Eevxp2BCbWq25ZdiXRwYd",
    },
  ],
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-09-15T16:37:53.000Z",
} as const satisfies Release
