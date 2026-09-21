import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayVioletHill = {
  id: "01a0676a-d730-7004-8ccf-bca56239fa40",
  type: "page-type/release",
  slug: "coldplay-violet-hill",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2008-05-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Pc9C27OlgTTtjvFxulqgG",
      externalLink: "https://open.spotify.com/album/2Pc9C27OlgTTtjvFxulqgG",
    },
  ],
  title: "Violet Hill",
} as const satisfies Release
