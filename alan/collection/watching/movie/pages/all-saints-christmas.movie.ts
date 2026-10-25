import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const allSaintsChristmas = {
  id: "01a1749a-4649-7a31-b498-8d24f20a2ba0",
  type: "page-type/movie",
  slug: "all-saints-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028176",
      externalLink: "https://www.themoviedb.org/movie/1028176",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "All Saints Christmas",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt22166882",
  posterPath: "/ktt31lbOXH5arOprUB1KHhwcMPN.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
