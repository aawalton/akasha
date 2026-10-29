import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS08e01 = {
  id: "01a18856-4006-7fc6-ae98-09f8f7e7fdeb",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s08e01",
  description:
    "Leonard and Amy make an unexpected trip to Arizona to fetch Sheldon; Penny interviews for a job at Bernadette's company; Stuart's relationship with Mrs. Wolowitz disturbs Howard.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-8"],
  position: 1,
  publishedAt: "2014-09-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1000640",
      externalLink: "https://www.themoviedb.org/tv/1418/season/8/episode/1",
    },
  ],
  title: "The Locomotion Interruption",
  episodeType: "standard",
  stillPath: "/eiknk78qNy9yYtmwjBZYLURhR19.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
