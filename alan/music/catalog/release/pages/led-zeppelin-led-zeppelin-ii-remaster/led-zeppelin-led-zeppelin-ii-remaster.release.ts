import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const ledZeppelinLedZeppelinIiRemaster = {
  id: "01a0676a-d722-706c-8d77-759fd75f5548",
  type: "page-type/release",
  slug: "led-zeppelin-led-zeppelin-ii-remaster",
  title: "Led Zeppelin II (Remaster)",
  partOfCollections: ["artist/led-zeppelin"],
  position: 0,
  ownLength: 41.628167,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1969-10-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "58MQ0PLijVHePUonQlK76Y",
      externalLink: "https://open.spotify.com/album/58MQ0PLijVHePUonQlK76Y",
    },
  ],
} as const satisfies Release
