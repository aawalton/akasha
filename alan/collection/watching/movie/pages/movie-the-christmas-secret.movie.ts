import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const movieTheChristmasSecret = {
  id: "01a17499-8947-7588-bb18-3476b0cd01d5",
  type: "page-type/movie",
  slug: "movie-the-christmas-secret",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2014-12-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "310972",
      externalLink: "https://www.themoviedb.org/movie/310972",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Christmas Secret",
  genres: ["Romance", "Drama", "Family", "TV Movie"],
  imdbId: "tt3626180",
  posterPath: "/tCaU7Hl9d7Ey3X9OokZoPsq7WfO.jpg",
  voteAverage: 6.799,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Hoichoi",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
