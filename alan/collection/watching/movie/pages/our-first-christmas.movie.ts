import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const ourFirstChristmas = {
  id: "01a17499-470e-756e-b716-e18fb1a1b063",
  type: "page-type/movie",
  slug: "our-first-christmas",
  ownLength: 89,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2008-12-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "80897",
      externalLink: "https://www.themoviedb.org/movie/80897",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Our First Christmas",
  genres: ["Family", "Comedy", "TV Movie", "Drama"],
  imdbId: "tt1274299",
  posterPath: "/5qB6jGoMrRsRvRRxtw6C81eJCc3.jpg",
  voteAverage: 5.3,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
