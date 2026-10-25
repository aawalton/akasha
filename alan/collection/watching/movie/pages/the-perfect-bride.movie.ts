import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const thePerfectBride = {
  id: "01a17499-a7d8-7cd2-8394-f9c19bc4ecaf",
  type: "page-type/movie",
  slug: "the-perfect-bride",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-perfect-bride"],
  position: 0,
  publishedAt: "2017-06-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "459840",
      externalLink: "https://www.themoviedb.org/movie/459840",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Perfect Bride",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt6874542",
  posterPath: "/ogy6TOTPFIf0ipDFt5SgALEULoY.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
