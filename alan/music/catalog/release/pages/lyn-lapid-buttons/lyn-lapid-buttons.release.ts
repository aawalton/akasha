import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidButtons = {
  id: "01a0676a-d719-704a-8f84-4277b2ecf8e1",
  type: "page-type/release",
  slug: "lyn-lapid-buttons",
  title: "buttons",
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  ownLength: 2.122367,
  ownProgress: 2.122367,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2024-10-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "60cW2bcyQVKvbCh0QmXyAK",
      externalLink: "https://open.spotify.com/album/60cW2bcyQVKvbCh0QmXyAK",
    },
  ],
} as const satisfies Release
