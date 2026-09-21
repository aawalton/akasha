import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioBadTimes = {
  id: "01a0676a-d718-700f-9fea-50b7de504f52",
  type: "page-type/release",
  slug: "jessica-baio-bad-times",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2025-07-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2foHbdP3fsBLwqH9SBkLy2",
      externalLink: "https://open.spotify.com/album/2foHbdP3fsBLwqH9SBkLy2",
    },
  ],
  title: "bad times",
} as const satisfies Release
