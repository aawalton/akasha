import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayASkyFullOfStars2 = {
  id: "01a0676a-d715-7040-b0eb-05437f63f3e6",
  type: "page-type/release",
  slug: "coldplay-a-sky-full-of-stars-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2014-06-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2jQB4YEh4xWhloG21IueUf",
      externalLink: "https://open.spotify.com/album/2jQB4YEh4xWhloG21IueUf",
    },
  ],
  title: "A Sky Full of Stars",
} as const satisfies Release
