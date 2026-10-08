import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineFumbledTheBag = {
  id: "01a0676a-d71e-7045-80ba-1357c6455594",
  type: "page-type/release",
  slug: "jenna-raine-fumbled-the-bag",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2022-09-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "52ohkU9cUvreRfFteBnsTR",
      externalLink: "https://open.spotify.com/album/52ohkU9cUvreRfFteBnsTR",
    },
  ],
  title: "Fumbled the Bag",
  createdAt: "2026-09-03T13:17:30.270Z",
  updatedAt: "2026-09-21T23:00:38.000Z",
} as const satisfies Release
