import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveInTheLimelight = {
  id: "01a1749a-464b-7ac4-a93b-aab8cf6e8b72",
  type: "page-type/movie",
  slug: "love-in-the-limelight",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-08-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1000237",
      externalLink: "https://www.themoviedb.org/movie/1000237",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love in the Limelight",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt21193618",
  posterPath: "/nTMKYX0hsJDND2KQ1wQ9hwnincv.jpg",
  voteAverage: 7,
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
