import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidButtons = {
  id: "01a0676a-d719-704a-8f84-4277b2ecf8e1",
  type: "page-type/release",
  slug: "lyn-lapid-buttons",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2024-10-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "60cW2bcyQVKvbCh0QmXyAK",
      externalLink: "https://open.spotify.com/album/60cW2bcyQVKvbCh0QmXyAK",
    },
  ],
  title: "buttons",
} as const satisfies Release
