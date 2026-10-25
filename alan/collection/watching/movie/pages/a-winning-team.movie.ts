import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aWinningTeam = {
  id: "01a1749a-66bc-7c30-89f3-86eae6e2fbb9",
  type: "page-type/movie",
  slug: "a-winning-team",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-03-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1077899",
      externalLink: "https://www.themoviedb.org/movie/1077899",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Winning Team",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt23057712",
  posterPath: "/xviCHALn9Hh86Y4ktQdkJ2Aajp7.jpg",
  voteAverage: 5.8,
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
