import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS03e10 = {
  id: "01a183d6-3265-7d96-9061-b5019ceffb39",
  type: "page-type/episode",
  slug: "gintama-s03e10",
  description:
    "Yamazaki, with the intent of spying on the Joui faction, undergoes the necessary testing and training as one of its new recruits.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-3"],
  position: 10,
  publishedAt: "2008-06-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940523",
      externalLink: "https://www.themoviedb.org/tv/57041/season/3/episode/10",
    },
  ],
  title: "Life is a test",
  episodeType: "standard",
  stillPath: "/4u03P9cyxWzuHasefypxkazsa27.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
