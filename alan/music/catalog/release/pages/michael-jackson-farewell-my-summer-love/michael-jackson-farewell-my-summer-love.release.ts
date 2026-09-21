import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const michaelJacksonFarewellMySummerLove = {
  id: "01a0676a-d71d-7063-8156-589740d2a1b9",
  type: "page-type/release",
  slug: "michael-jackson-farewell-my-summer-love",
  title: "Farewell My Summer Love",
  partOfCollections: ["artist/michael-jackson"],
  position: 0,
  ownLength: 30.994167,
  ownProgress: 30.994167,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "1984-05-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "21KDELF4LP2L6EUGIi48qR",
      externalLink: "https://open.spotify.com/album/21KDELF4LP2L6EUGIi48qR",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
