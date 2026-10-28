import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theQuintessentialQuintupletsMovie = {
  id: "01a183de-0d54-77ea-9754-7036586b8c50",
  type: "page-type/movie",
  slug: "the-quintessential-quintuplets-movie",
  ownLength: 136,
  ownProgress: 0,
  partOfCollections: ["fandom/the-quintessential-quintuplets"],
  publishedAt: "2022-05-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "820067",
      externalLink: "https://www.themoviedb.org/movie/820067",
    },
  ],
  title: "The Quintessential Quintuplets Movie",
  createdAt: "2026-10-28T18:55:30.132Z",
  updatedAt: "2026-10-28T18:55:30.132Z",
} as const satisfies Movie
