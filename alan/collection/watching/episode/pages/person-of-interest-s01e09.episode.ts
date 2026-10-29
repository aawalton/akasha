import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS01e09 = {
  id: "01a18851-3df3-7318-8dfd-b06132894cd0",
  type: "page-type/episode",
  slug: "person-of-interest-s01e09",
  description:
    "Reese and Finch’s game of cat and mouse with Detective Carter becomes infinitely more complicated when The Machine declares that she is their newest POI.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-1"],
  position: 9,
  publishedAt: "2011-12-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64063",
      externalLink: "https://www.themoviedb.org/tv/1411/season/1/episode/9",
    },
  ],
  title: "Get Carter",
  episodeType: "standard",
  stillPath: "/yfOf7Af8EN50Qq6PqFPUc4OdJQG.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
