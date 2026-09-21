import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioStartOver = {
  id: "01a0676a-d72a-7018-8272-0bc364d152a5",
  type: "page-type/release",
  slug: "jessica-baio-start-over",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2022-12-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0hOwWleymsxLKGnlRRgKFY",
      externalLink: "https://open.spotify.com/album/0hOwWleymsxLKGnlRRgKFY",
    },
  ],
  title: "start over",
} as const satisfies Release
