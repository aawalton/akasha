import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const luckyChristmas = {
  id: "01a17499-66a0-7656-ad4f-a5235a52cffb",
  type: "page-type/movie",
  slug: "lucky-christmas",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2011-11-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "81421",
      externalLink: "https://www.themoviedb.org/movie/81421",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Lucky Christmas",
  genres: ["Family", "Drama", "Romance", "TV Movie"],
  imdbId: "tt2039366",
  posterPath: "/nPBjJgbGxcWAOEdHpvT4m52ISvI.jpg",
  voteAverage: 5.7,
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
