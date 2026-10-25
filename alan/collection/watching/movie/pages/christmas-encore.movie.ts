import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasEncore = {
  id: "01a17499-c95b-7d43-b106-6d75b1f61563",
  type: "page-type/movie",
  slug: "christmas-encore",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-12-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "475833",
      externalLink: "https://www.themoviedb.org/movie/475833",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Encore",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt7714138",
  posterPath: "/oNL3C9ifCxM1eTcBecQxTFxZDNg.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
