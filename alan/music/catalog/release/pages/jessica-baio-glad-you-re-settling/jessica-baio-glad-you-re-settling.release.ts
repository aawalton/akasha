import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioGladYouReSettling = {
  id: "01a0676a-d71f-7001-a83f-5ed8185f180d",
  type: "page-type/release",
  slug: "jessica-baio-glad-you-re-settling",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2023-09-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5qAfPJITAqspui8l3iIwLP",
      externalLink: "https://open.spotify.com/album/5qAfPJITAqspui8l3iIwLP",
    },
  ],
  title: "glad you’re settling",
} as const satisfies Release
