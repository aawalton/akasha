import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerLandslide = {
  id: "01a0676a-d722-7059-b32b-71fe5514ec64",
  type: "page-type/release",
  slug: "jada-facer-landslide",
  title: "Landslide",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.813333,
  ownProgress: 2.813333,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-04-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1s3BGHbUzlPmN99u1dMWDt",
      externalLink: "https://open.spotify.com/album/1s3BGHbUzlPmN99u1dMWDt",
    },
  ],
} as const satisfies Release
