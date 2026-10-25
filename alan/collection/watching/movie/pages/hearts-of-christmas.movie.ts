import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const heartsOfChristmas = {
  id: "01a17499-a7d5-7c54-b827-7461fb459e4f",
  type: "page-type/movie",
  slug: "hearts-of-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-12-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "421633",
      externalLink: "https://www.themoviedb.org/movie/421633",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hearts of Christmas",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt6321108",
  posterPath: "/AjRXtoQYiP3sURyuHsR7Gthl8BK.jpg",
  voteAverage: 6.5,
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
