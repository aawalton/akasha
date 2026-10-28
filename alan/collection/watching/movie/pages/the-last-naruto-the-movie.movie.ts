import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theLastNarutoTheMovie = {
  id: "01a183d2-6ea9-76dc-a0eb-9338e2ab2405",
  type: "page-type/movie",
  slug: "the-last-naruto-the-movie",
  ownLength: 114,
  ownProgress: 0,
  partOfCollections: ["fandom/naruto"],
  publishedAt: "2014-12-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "317442",
      externalLink: "https://www.themoviedb.org/movie/317442",
    },
  ],
  title: "The Last: Naruto the Movie",
  createdAt: "2026-10-28T18:42:48.617Z",
  updatedAt: "2026-10-28T18:42:48.617Z",
} as const satisfies Movie
