import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const thePerfectCatch = {
  id: "01a17499-a7d8-7bb2-a9fa-74716ca283b3",
  type: "page-type/movie",
  slug: "the-perfect-catch",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-04-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "450679",
      externalLink: "https://www.themoviedb.org/movie/450679",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Perfect Catch",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt6782486",
  posterPath: "/wLO64np21v6uKlHSMUGsRDG16II.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
