import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const finalApproach = {
  id: "01a17497-3825-735a-8c4b-11bbf80276f6",
  type: "page-type/movie",
  slug: "final-approach",
  ownLength: 170,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2008-05-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "17081",
      externalLink: "https://www.themoviedb.org/movie/17081",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Final_Approach_(2007_film)",
    },
  ],
  title: "Final Approach",
  genres: ["Thriller", "Action", "TV Movie"],
  imdbId: "tt0929858",
  posterPath: "/ggiEWXZpWWXwcnrqs78qP2DsZub.jpg",
  voteAverage: 5.1,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
