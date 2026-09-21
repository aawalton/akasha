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
} as const satisfies Release
