import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const finalDaysOfPlanetEarth = {
  id: "01a17497-3825-76ac-8f4a-376bb5cb0bb7",
  type: "page-type/movie",
  slug: "final-days-of-planet-earth",
  ownLength: 170,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2006-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "16067",
      externalLink: "https://www.themoviedb.org/movie/16067",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Final_Days_of_Planet_Earth",
    },
  ],
  title: "Final Days of Planet Earth",
  genres: ["Action", "Science Fiction", "Drama", "Horror"],
  imdbId: "tt0478073",
  posterPath: "/dW8lvvTmxZ5CTZKRwtqTrO1K1sA.jpg",
  voteAverage: 4.8,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
