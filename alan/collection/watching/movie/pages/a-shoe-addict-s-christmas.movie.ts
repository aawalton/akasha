import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aShoeAddictSChristmas = {
  id: "01a17499-e800-7aee-831a-cc2791cd4665",
  type: "page-type/movie",
  slug: "a-shoe-addict-s-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "535809",
      externalLink: "https://www.themoviedb.org/movie/535809",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Shoe Addict's Christmas",
  genres: ["Romance", "Drama", "TV Movie", "Fantasy"],
  imdbId: "tt8634202",
  posterPath: "/xAMSWUBSG8rhXuU9JmQItWNmn4U.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
