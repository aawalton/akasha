import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2Folklore = {
  id: "01a0676a-d71e-701b-b7a7-47adc86bd4f1",
  type: "page-type/release",
  slug: "taylor-swift-2-folklore",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2020-07-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2fenSS68JI1h4Fo296JfGr",
      externalLink: "https://open.spotify.com/album/2fenSS68JI1h4Fo296JfGr",
    },
  ],
  title: "folklore",
} as const satisfies Release
