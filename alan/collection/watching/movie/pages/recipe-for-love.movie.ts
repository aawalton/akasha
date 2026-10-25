import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const recipeForLove = {
  id: "01a17499-8948-7f5e-be88-50c68b81b54e",
  type: "page-type/movie",
  slug: "recipe-for-love",
  ownLength: 81,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2014-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "293205",
      externalLink: "https://www.themoviedb.org/movie/293205",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Recipe for Love",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt4067256",
  posterPath: "/ufxmSBb5CbmxdruL45WQYsW4mEI.jpg",
  voteAverage: 5.945,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "Tubi TV",
    "YouTube Free",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
