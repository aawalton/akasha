import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const joyeuxNoel = {
  id: "01a1749a-66be-73de-82d3-c409f8871fda",
  type: "page-type/movie",
  slug: "joyeux-noel",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-10-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180660",
      externalLink: "https://www.themoviedb.org/movie/1180660",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Joyeux Noel",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt29353013",
  posterPath: "/gRpkKeVfH9fLPiuKTupCJw7NZAj.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
