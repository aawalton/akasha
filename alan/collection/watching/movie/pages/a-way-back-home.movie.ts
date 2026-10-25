import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aWayBackHome = {
  id: "01a17499-669c-7a88-b13f-6901b04e159b",
  type: "page-type/movie",
  slug: "a-way-back-home",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2013-06-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "243543",
      externalLink: "https://www.themoviedb.org/movie/243543",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Way Back Home",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt2796792",
  posterPath: "/wO5H2z94H0GJqZCvjEEBvUdss9F.jpg",
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
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
