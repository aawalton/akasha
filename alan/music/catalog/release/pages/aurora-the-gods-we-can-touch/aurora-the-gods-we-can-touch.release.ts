import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraTheGodsWeCanTouch = {
  id: "01a0676a-d72d-7015-9214-09e0722a3c13",
  type: "page-type/release",
  slug: "aurora-the-gods-we-can-touch",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2022-01-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5z1xjvymitc0DJETtvVmaX",
      externalLink: "https://open.spotify.com/album/5z1xjvymitc0DJETtvVmaX",
    },
  ],
  title: "The Gods We Can Touch",
} as const satisfies Release
