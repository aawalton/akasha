import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineFumbledTheBag = {
  id: "01a0676a-d71e-7045-80ba-1357c6455594",
  type: "release",
  slug: "jenna-raine-fumbled-the-bag",
  title: "Fumbled the Bag",
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  ownLength: 3.1606,
  ownProgress: 3.1606,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2022-09-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "52ohkU9cUvreRfFteBnsTR",
      externalLink: "https://open.spotify.com/album/52ohkU9cUvreRfFteBnsTR",
    },
  ],
} as const satisfies Release
