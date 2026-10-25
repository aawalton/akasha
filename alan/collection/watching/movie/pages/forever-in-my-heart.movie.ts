import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const foreverInMyHeart = {
  id: "01a17499-e803-7a9d-a6d4-0c0c446442eb",
  type: "page-type/movie",
  slug: "forever-in-my-heart",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-09-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "627370",
      externalLink: "https://www.themoviedb.org/movie/627370",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Forever in My Heart",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt10791618",
  posterPath: "/bECgGdJgq1D6FMdieVIhUDvShD2.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
