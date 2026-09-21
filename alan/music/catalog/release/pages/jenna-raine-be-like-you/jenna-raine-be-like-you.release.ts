import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineBeLikeYou = {
  id: "01a0676a-d718-701c-8be1-e15b6e0cdbbd",
  type: "page-type/release",
  slug: "jenna-raine-be-like-you",
  title: "Be Like You",
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  ownLength: 20.076167,
  ownProgress: 20.076167,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2019-11-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ndA2by7oDtfJIdUDx1Qk1",
      externalLink: "https://open.spotify.com/album/3ndA2by7oDtfJIdUDx1Qk1",
    },
  ],
} as const satisfies Release
