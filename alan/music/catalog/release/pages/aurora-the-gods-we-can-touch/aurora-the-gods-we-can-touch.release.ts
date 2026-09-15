import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraTheGodsWeCanTouch = {
  id: "01a0676a-d72d-7015-9214-09e0722a3c13",
  type: "page-type/release",
  slug: "aurora-the-gods-we-can-touch",
  title: "The Gods We Can Touch",
  partOfCollections: ["artist/aurora"],
  position: 0,
  ownLength: 50.014733,
  ownProgress: 50.014733,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-01-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5z1xjvymitc0DJETtvVmaX",
      externalLink: "https://open.spotify.com/album/5z1xjvymitc0DJETtvVmaX",
    },
  ],
} as const satisfies Release
