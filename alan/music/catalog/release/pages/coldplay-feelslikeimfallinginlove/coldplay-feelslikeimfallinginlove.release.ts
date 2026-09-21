import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayFeelslikeimfallinginlove = {
  id: "01a0676a-d71d-706e-bdb9-fa64b0bd5c6f",
  type: "page-type/release",
  slug: "coldplay-feelslikeimfallinginlove",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2024-06-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6RjTapeTvms8jSeIRGc5Ve",
      externalLink: "https://open.spotify.com/album/6RjTapeTvms8jSeIRGc5Ve",
    },
  ],
  title: "feelslikeimfallinginlove",
} as const satisfies Release
