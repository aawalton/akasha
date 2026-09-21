import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayHigherPowerZhuRemix = {
  id: "01a0676a-d720-703f-bd96-1d1f1fe2cb2f",
  type: "page-type/release",
  slug: "coldplay-higher-power-zhu-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2021-05-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0kqW9S1stTTI6dsC6JztJf",
      externalLink: "https://open.spotify.com/album/0kqW9S1stTTI6dsC6JztJf",
    },
  ],
  title: "Higher Power (ZHU Remix)",
} as const satisfies Release
