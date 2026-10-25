import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theColorOfRain = {
  id: "01a17499-8949-7566-98d8-a3953f3622ec",
  type: "page-type/movie",
  slug: "the-color-of-rain",
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2014-05-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "274007",
      externalLink: "https://www.themoviedb.org/movie/274007",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Color of Rain",
  genres: ["TV Movie", "Drama"],
  imdbId: "tt3004852",
  posterPath: "/jPM4wc3KLVYYi9uOG0EowwwaWZ6.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
