import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasRing = {
  id: "01a1749a-259e-7fdd-b9cd-3f0efbdaa1e3",
  type: "page-type/movie",
  slug: "the-christmas-ring",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746035",
      externalLink: "https://www.themoviedb.org/movie/746035",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Christmas Ring",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt13267034",
  posterPath: "/qG6kfgzZyekumMjM9oxRNNIeYoL.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
