import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fiveMoreMinutes = {
  id: "01a1749a-464a-7319-b297-1f105d743136",
  type: "page-type/movie",
  slug: "five-more-minutes",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/five-more-minutes"],
  position: 1,
  publishedAt: "2021-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874157",
      externalLink: "https://www.themoviedb.org/movie/874157",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Five More Minutes",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt15943510",
  posterPath: "/Pq9YCayI788MXeLnCcOJijWNZD.jpg",
  voteAverage: 7.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T20:45:19.452Z",
} as const satisfies Movie
