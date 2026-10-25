import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasDoctor = {
  id: "01a1749a-259e-7a83-99a7-d39639c24297",
  type: "page-type/movie",
  slug: "the-christmas-doctor",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746040",
      externalLink: "https://www.themoviedb.org/movie/746040",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Christmas Doctor",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt13341408",
  posterPath: "/ccKVfjFudH4SM16Svyab5fwBYcS.jpg",
  voteAverage: 6.9,
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
