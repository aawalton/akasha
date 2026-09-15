import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerYouAreMySunshine = {
  id: "01a0676a-d732-7002-bb02-2098c03fe068",
  type: "release",
  slug: "jada-facer-you-are-my-sunshine",
  title: "You Are My Sunshine",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.5465,
  ownProgress: 2.5465,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-05-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7A6AKJTfbg483XiYZZWsfL",
      externalLink: "https://open.spotify.com/album/7A6AKJTfbg483XiYZZWsfL",
    },
  ],
} as const satisfies Release
