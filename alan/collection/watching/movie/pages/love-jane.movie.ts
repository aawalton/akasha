import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveJane = {
  id: "01a1749a-89a9-7501-9b99-d3f196a8d554",
  type: "page-type/movie",
  slug: "love-jane",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-02-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1221677",
      externalLink: "https://www.themoviedb.org/movie/1221677",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love & Jane",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt31024928",
  posterPath: "/vKF3To8cmb7lPQw7iySTGsG8Z2A.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
