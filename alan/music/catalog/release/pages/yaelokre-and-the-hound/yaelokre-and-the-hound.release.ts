import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const yaelokreAndTheHound = {
  id: "01a0676a-d717-7019-b3d3-4b32db3a8dfc",
  type: "page-type/release",
  slug: "yaelokre-and-the-hound",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/yaelokre"],
  position: 0,
  publishedAt: "2024-01-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0QeFtPEdGdDtTuHp9tCScd",
      externalLink: "https://open.spotify.com/album/0QeFtPEdGdDtTuHp9tCScd",
    },
  ],
  title: "And the Hound",
  createdAt: "2026-09-03T13:17:30.263Z",
  updatedAt: "2026-09-23T14:01:20.000Z",
} as const satisfies Release
