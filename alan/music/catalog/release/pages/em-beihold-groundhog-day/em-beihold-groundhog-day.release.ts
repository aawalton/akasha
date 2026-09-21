import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdGroundhogDay = {
  id: "01a0676a-d71f-7032-baa4-38f5c28d555f",
  type: "page-type/release",
  slug: "em-beihold-groundhog-day",
  title: "Groundhog Day",
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  ownLength: 2.89365,
  ownProgress: 2.89365,
  unit: "unit/minutes",
  status: "completed",
  grade: "A",
  publishedAt: "2021-05-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Nv9MBWrH1OmMohTasPc4O",
      externalLink: "https://open.spotify.com/album/0Nv9MBWrH1OmMohTasPc4O",
    },
  ],
} as const satisfies Release
