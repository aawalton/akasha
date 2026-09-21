import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioBadTattoo = {
  id: "01a0676a-d718-700e-bcdc-618058cf8088",
  type: "page-type/release",
  slug: "jessica-baio-bad-tattoo",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2023-12-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0j7ZjvfGjpbiSZl4Jm0BKR",
      externalLink: "https://open.spotify.com/album/0j7ZjvfGjpbiSZl4Jm0BKR",
    },
  ],
  title: "bad tattoo",
} as const satisfies Release
