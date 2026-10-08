import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerYouth = {
  id: "01a0676a-d732-7029-ba0c-a877240bc271",
  type: "page-type/release",
  slug: "jada-facer-youth",
  title: "Youth",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.379117,
  ownProgress: 2.379117,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-09-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0tbDUJJgJy5UHR3IHAWmld",
      externalLink: "https://open.spotify.com/album/0tbDUJJgJy5UHR3IHAWmld",
    },
  ],
  createdAt: "2026-09-03T13:17:30.290Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
