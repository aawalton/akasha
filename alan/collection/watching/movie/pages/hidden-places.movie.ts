import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const hiddenPlaces = {
  id: "01a17497-3826-7488-82ad-6d2cb8e4b2c7",
  type: "page-type/movie",
  slug: "hidden-places",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2006-01-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "71752",
      externalLink: "https://www.themoviedb.org/movie/71752",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Hidden_Places" },
  ],
  title: "Hidden Places",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt0466831",
  posterPath: "/mExiAl7zaqhxXuubS2OqSqpYubi.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
