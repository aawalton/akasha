import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const dadSHome = {
  id: "01a17499-470c-7d9c-b3ea-773fe1fa06cd",
  type: "page-type/movie",
  slug: "dad-s-home",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2010-06-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "105436",
      externalLink: "https://www.themoviedb.org/movie/105436",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Dad's Home",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt1531908",
  posterPath: "/pninqyZVS7zoR6mMDpIk0FlzX3e.jpg",
  voteAverage: 6,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
