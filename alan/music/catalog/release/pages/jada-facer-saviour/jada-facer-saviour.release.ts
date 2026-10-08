import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerSaviour = {
  id: "01a0676a-d728-7049-ab9a-d08cf5df784f",
  type: "page-type/release",
  slug: "jada-facer-saviour",
  title: "Saviour",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 3.238483,
  ownProgress: 3.238483,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-04-06",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2K2WvcCvBgypwWingLoSvE",
      externalLink: "https://open.spotify.com/album/2K2WvcCvBgypwWingLoSvE",
    },
  ],
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
