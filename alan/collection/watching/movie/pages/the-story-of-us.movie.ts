import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theStoryOfUs = {
  id: "01a17499-e806-74fa-8774-c5762c5fbba9",
  type: "page-type/movie",
  slug: "the-story-of-us",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-02-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "576583",
      externalLink: "https://www.themoviedb.org/movie/576583",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Story of Us",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt9602544",
  posterPath: "/aH4kDrlgVgmokxskWJ7M0aewa4E.jpg",
  voteAverage: 5.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
