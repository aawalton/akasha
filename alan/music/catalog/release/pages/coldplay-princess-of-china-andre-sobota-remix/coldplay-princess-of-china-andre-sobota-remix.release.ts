import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayPrincessOfChinaAndreSobotaRemix = {
  id: "01a0676a-d727-701f-9b0c-fbb98aebddc5",
  type: "page-type/release",
  slug: "coldplay-princess-of-china-andre-sobota-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2012-06-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5GMAB2CiYfO711PUbJHMp4",
      externalLink: "https://open.spotify.com/album/5GMAB2CiYfO711PUbJHMp4",
    },
  ],
  title: "Princess of China (Andre Sobota Remix)",
} as const satisfies Release
