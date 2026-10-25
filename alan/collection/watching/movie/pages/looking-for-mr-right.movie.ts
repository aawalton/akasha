import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const lookingForMrRight = {
  id: "01a17499-8946-72be-8715-55a585a29891",
  type: "page-type/movie",
  slug: "looking-for-mr-right",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2014-06-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "279582",
      externalLink: "https://www.themoviedb.org/movie/279582",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Looking for Mr. Right",
  genres: ["Romance", "Comedy", "Family", "Drama", "TV Movie"],
  imdbId: "tt3461912",
  posterPath: "/p6RnD7SDIH2kNsf4jKlXp4rSz7e.jpg",
  voteAverage: 5.7,
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
