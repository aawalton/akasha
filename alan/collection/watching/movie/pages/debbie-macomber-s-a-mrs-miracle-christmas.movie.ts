import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const debbieMacomberSAMrsMiracleChristmas = {
  id: "01a1749a-464a-786c-bf79-293cc64b2ce4",
  type: "page-type/movie",
  slug: "debbie-macomber-s-a-mrs-miracle-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/mrs-miracle"],
  position: 4,
  publishedAt: "2021-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "877690",
      externalLink: "https://www.themoviedb.org/movie/877690",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Debbie Macomber's A Mrs. Miracle Christmas",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt15502006",
  posterPath: "/rUrCxAs3byx0jnjcfWxjtGTQ0U.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T20:45:19.452Z",
} as const satisfies Movie
