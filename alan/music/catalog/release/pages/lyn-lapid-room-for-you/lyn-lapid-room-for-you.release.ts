import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidRoomForYou = {
  id: "01a0676a-d728-701f-ab30-22400a2f0839",
  type: "page-type/release",
  slug: "lyn-lapid-room-for-you",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2024-07-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6NbgKBujDaLM236wpFEwOu",
      externalLink: "https://open.spotify.com/album/6NbgKBujDaLM236wpFEwOu",
    },
  ],
  title: "Room For You",
} as const satisfies Release
