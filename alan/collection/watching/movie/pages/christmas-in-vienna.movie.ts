import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasInVienna = {
  id: "01a1749a-06ba-7fcf-beb6-415a6398eb9c",
  type: "page-type/movie",
  slug: "christmas-in-vienna",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "726523",
      externalLink: "https://www.themoviedb.org/movie/726523",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas in Vienna",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt13341400",
  posterPath: "/cRKI2spqkQ90X67IVW9SpoU8vqw.jpg",
  voteAverage: 6.455,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "The Roku Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
