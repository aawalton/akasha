import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayEveryTeardropIsAWaterfall = {
  id: "01a0676a-d71d-7033-aafd-13ab25efa176",
  type: "page-type/release",
  slug: "coldplay-every-teardrop-is-a-waterfall",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2011-06-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "167lFNaglzjVhEDB7smSFL",
      externalLink: "https://open.spotify.com/album/167lFNaglzjVhEDB7smSFL",
    },
  ],
  title: "Every Teardrop Is a Waterfall",
} as const satisfies Release
