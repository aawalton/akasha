import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const youMeTheChristmasTrees = {
  id: "01a1749a-259e-7897-bd5f-3a860df3aa12",
  type: "page-type/movie",
  slug: "you-me-the-christmas-trees",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "877692",
      externalLink: "https://www.themoviedb.org/movie/877692",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "You, Me & the Christmas Trees",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt15484422",
  posterPath: "/ezgKTTz3ZT6wksXREympqR7G2eM.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
