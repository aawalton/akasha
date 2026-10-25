import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const marryMeAtChristmas = {
  id: "01a17499-c95e-7376-8dc5-05ddc6b5da70",
  type: "page-type/movie",
  slug: "marry-me-at-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-10-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "474987",
      externalLink: "https://www.themoviedb.org/movie/474987",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Marry Me at Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt6791000",
  posterPath: "/aAzbrvZLiurV0i7rJdVCXlOmVOa.jpg",
  voteAverage: 6.4,
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
