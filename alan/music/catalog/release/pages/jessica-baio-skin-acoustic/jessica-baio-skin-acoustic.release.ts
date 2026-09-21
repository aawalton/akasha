import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioSkinAcoustic = {
  id: "01a0676a-d729-7017-996d-567a46c090e4",
  type: "page-type/release",
  slug: "jessica-baio-skin-acoustic",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2022-04-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "27raWQlJAFnw3FER1dpyMQ",
      externalLink: "https://open.spotify.com/album/27raWQlJAFnw3FER1dpyMQ",
    },
  ],
  title: "skin (acoustic)",
} as const satisfies Release
