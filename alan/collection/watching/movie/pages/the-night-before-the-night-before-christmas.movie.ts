import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theNightBeforeTheNightBeforeChristmas = {
  id: "01a17499-470f-720d-aa8e-2392690211d0",
  type: "page-type/movie",
  slug: "the-night-before-the-night-before-christmas",
  ownLength: 91,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2010-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "74352",
      externalLink: "https://www.themoviedb.org/movie/74352",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Night Before the Night Before Christmas",
  genres: ["Family", "Fantasy", "TV Movie"],
  imdbId: "tt1567140",
  posterPath: "/ij7dc3JdWUu3xfhkRePMZBiYXo9.jpg",
  voteAverage: 5.4,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
