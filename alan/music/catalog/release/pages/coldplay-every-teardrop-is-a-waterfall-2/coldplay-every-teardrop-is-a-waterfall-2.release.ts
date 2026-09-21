import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayEveryTeardropIsAWaterfall2 = {
  id: "01a0676a-d71d-7034-b734-7c26e95f7567",
  type: "page-type/release",
  slug: "coldplay-every-teardrop-is-a-waterfall-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2011-06-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1oXauHeoAxhtOFX82nlun7",
      externalLink: "https://open.spotify.com/album/1oXauHeoAxhtOFX82nlun7",
    },
  ],
  title: "Every Teardrop Is a Waterfall",
} as const satisfies Release
