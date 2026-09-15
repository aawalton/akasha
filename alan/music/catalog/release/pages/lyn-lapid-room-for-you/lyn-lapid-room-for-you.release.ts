import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidRoomForYou = {
  id: "01a0676a-d728-701f-ab30-22400a2f0839",
  type: "page-type/release",
  slug: "lyn-lapid-room-for-you",
  title: "Room For You",
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  ownLength: 3.056217,
  ownProgress: 3.056217,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2024-07-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6NbgKBujDaLM236wpFEwOu",
      externalLink: "https://open.spotify.com/album/6NbgKBujDaLM236wpFEwOu",
    },
  ],
} as const satisfies Release
