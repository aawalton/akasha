import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioBiteTheBullet = {
  id: "01a0676a-d719-7010-8928-bb71b7ef9d76",
  type: "page-type/release",
  slug: "jessica-baio-bite-the-bullet",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2024-07-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5MjDGMrdbxHxERuwT79EQ2",
      externalLink: "https://open.spotify.com/album/5MjDGMrdbxHxERuwT79EQ2",
    },
  ],
  title: "bite the bullet",
  createdAt: "2026-09-03T13:17:30.265Z",
  updatedAt: "2026-09-21T23:00:38.000Z",
} as const satisfies Release
