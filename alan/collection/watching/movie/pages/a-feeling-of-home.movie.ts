import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aFeelingOfHome = {
  id: "01a17499-e800-7e98-b4d5-e28498bf4043",
  type: "page-type/movie",
  slug: "a-feeling-of-home",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-05-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "594695",
      externalLink: "https://www.themoviedb.org/movie/594695",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Feeling of Home",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt10136840",
  posterPath: "/zHwhiDnxwchloC1rrWpKYGOwlB3.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
