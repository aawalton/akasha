import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const ledZeppelinLedZeppelinIvRemaster = {
  id: "01a0676a-d722-7070-b9a9-f7e2db72a712",
  type: "release",
  slug: "led-zeppelin-led-zeppelin-iv-remaster",
  title: "Led Zeppelin IV (Remaster)",
  partOfCollections: ["artist/led-zeppelin"],
  position: 0,
  ownLength: 42.5933,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1971-11-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5EyIDBAqhnlkAHqvPRwdbX",
      externalLink: "https://open.spotify.com/album/5EyIDBAqhnlkAHqvPRwdbX",
    },
  ],
} as const satisfies Release
