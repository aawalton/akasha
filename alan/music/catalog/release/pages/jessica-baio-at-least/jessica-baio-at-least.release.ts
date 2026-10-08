import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioAtLeast = {
  id: "01a0676a-d717-703a-af6f-f2abc03d97a4",
  type: "page-type/release",
  slug: "jessica-baio-at-least",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2022-05-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2BBcTVEutwYuwBFQDOeaNt",
      externalLink: "https://open.spotify.com/album/2BBcTVEutwYuwBFQDOeaNt",
    },
  ],
  title: "at least",
  createdAt: "2026-09-03T13:17:30.263Z",
  updatedAt: "2026-09-21T23:00:38.000Z",
} as const satisfies Release
