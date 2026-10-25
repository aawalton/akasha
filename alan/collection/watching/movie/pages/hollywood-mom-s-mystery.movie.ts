import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const hollywoodMomSMystery = {
  id: "01a17497-3826-7776-b3ca-98d488f0731b",
  type: "page-type/movie",
  slug: "hollywood-mom-s-mystery",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2004-08-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "120402",
      externalLink: "https://www.themoviedb.org/movie/120402",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Hollywood Mom's Mystery",
  genres: ["Comedy", "Thriller", "TV Movie"],
  imdbId: "tt0377751",
  posterPath: "/hZYqn6qRG8VzxxzY5NEvdxW258A.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
