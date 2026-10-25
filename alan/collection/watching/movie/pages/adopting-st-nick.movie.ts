import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const adoptingStNick = {
  id: "01a1749a-c868-7876-8df5-714729ea1656",
  type: "page-type/movie",
  slug: "adopting-st-nick",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-10-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773374",
      externalLink: "https://www.themoviedb.org/movie/1773374",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Adopting St. Nick",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt43749818",
  posterPath: "/vjia4mDV197Y3alxTK5Gzm8zA65.jpg",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
