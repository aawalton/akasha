import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const girlInRedWatchYouSleep = {
  id: "01a0676a-d730-701a-8309-18c95e1875e6",
  type: "page-type/release",
  slug: "girl-in-red-watch-you-sleep",
  title: "watch you sleep.",
  partOfCollections: ["artist/girl-in-red"],
  position: 0,
  ownLength: 3.00375,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-01-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "788Q6tUcihFxDsOGGeyuFE",
      externalLink: "https://open.spotify.com/album/788Q6tUcihFxDsOGGeyuFE",
    },
  ],
} as const satisfies Release
