import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aPerfectChristmas = {
  id: "01a17499-a7d3-7fe3-a69c-f902ecc1a10a",
  type: "page-type/movie",
  slug: "a-perfect-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-07-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "403400",
      externalLink: "https://www.themoviedb.org/movie/403400",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Perfect Christmas",
  genres: ["Comedy", "Family", "Romance", "TV Movie"],
  imdbId: "tt5863634",
  posterPath: "/bsMoah6BOPoygMY3lHn3raSjMLy.jpg",
  voteAverage: 5.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
