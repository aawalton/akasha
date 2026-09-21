import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraAwakening = {
  id: "01a0676a-d717-7045-97d6-242bddf1191d",
  type: "page-type/release",
  slug: "aurora-awakening",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2014-03-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5zG8EfFYGCy5rN44KJHNMl",
      externalLink: "https://open.spotify.com/album/5zG8EfFYGCy5rN44KJHNMl",
    },
  ],
  title: "Awakening",
} as const satisfies Release
