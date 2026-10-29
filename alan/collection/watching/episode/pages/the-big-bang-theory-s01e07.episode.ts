import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS01e07 = {
  id: "01a18856-3ffd-7346-8121-8781495a4fed",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s01e07",
  description:
    "With Wolowitz AWOL with one of her friends, Penny's recruited to fill in for him on the guys' Halo team",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-1"],
  position: 7,
  publishedAt: "2007-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64767",
      externalLink: "https://www.themoviedb.org/tv/1418/season/1/episode/7",
    },
  ],
  title: "The Dumpling Paradox",
  episodeType: "standard",
  stillPath: "/4y5rvzPZF5ukM3vtktqWTp9MhyH.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
