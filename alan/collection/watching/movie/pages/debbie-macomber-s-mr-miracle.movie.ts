import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const debbieMacomberSMrMiracle = {
  id: "01a17499-8945-78fb-9c78-b3e6c3b870d6",
  type: "page-type/movie",
  slug: "debbie-macomber-s-mr-miracle",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["franchise/mrs-miracle"],
  position: 3,
  publishedAt: "2014-12-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "299585",
      externalLink: "https://www.themoviedb.org/movie/299585",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Debbie Macomber's Mr. Miracle",
  genres: ["Drama", "Family", "TV Movie"],
  imdbId: "tt3946792",
  posterPath: "/2KQiBN5ogHIoqSWAmq5wRHikNe0.jpg",
  voteAverage: 5.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T20:45:01.766Z",
} as const satisfies Movie
