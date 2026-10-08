import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdGroundhogDay = {
  id: "01a0676a-d71f-7032-baa4-38f5c28d555f",
  type: "page-type/release",
  slug: "em-beihold-groundhog-day",
  grade: "A",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2021-05-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Nv9MBWrH1OmMohTasPc4O",
      externalLink: "https://open.spotify.com/album/0Nv9MBWrH1OmMohTasPc4O",
    },
  ],
  title: "Groundhog Day",
  createdAt: "2026-09-03T13:17:30.271Z",
  updatedAt: "2026-09-24T14:01:01.000Z",
} as const satisfies Release
