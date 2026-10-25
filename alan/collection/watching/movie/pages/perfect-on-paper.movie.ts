import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const perfectOnPaper = {
  id: "01a17499-8948-74e9-af5f-b7d280e7fa07",
  type: "page-type/movie",
  slug: "perfect-on-paper",
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2014-09-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "289520",
      externalLink: "https://www.themoviedb.org/movie/289520",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Perfect on Paper",
  genres: ["Comedy", "Romance", "Family", "TV Movie"],
  imdbId: "tt3630228",
  posterPath: "/owJbhX0kevW6Qcc1ZhvZSNxNPAD.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
