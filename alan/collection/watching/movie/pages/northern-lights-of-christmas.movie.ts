import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const northernLightsOfChristmas = {
  id: "01a17499-e805-78df-8f5b-beba8abd7ca1",
  type: "page-type/movie",
  slug: "northern-lights-of-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "550079",
      externalLink: "https://www.themoviedb.org/movie/550079",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Northern Lights of Christmas",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt9029324",
  posterPath: "/67QB6sqUxhV5lhuF6zIdYcNPYSF.jpg",
  voteAverage: 6.366,
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
