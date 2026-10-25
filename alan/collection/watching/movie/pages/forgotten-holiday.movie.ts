import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const forgottenHoliday = {
  id: "01a1749a-c869-76b3-bfab-ab051d4eeadf",
  type: "page-type/movie",
  slug: "forgotten-holiday",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-10-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773382",
      externalLink: "https://www.themoviedb.org/movie/1773382",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Forgotten Holiday",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt46071998",
  posterPath: "/rXL5YNUvubq5Z4EjhEEYc6bA7hf.jpg",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
