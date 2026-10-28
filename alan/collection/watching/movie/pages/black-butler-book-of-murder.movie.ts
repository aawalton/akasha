import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const blackButlerBookOfMurder = {
  id: "01a183d8-a29c-795c-8e5b-811811f85d4f",
  type: "page-type/movie",
  slug: "black-butler-book-of-murder",
  ownLength: 116,
  ownProgress: 0,
  partOfCollections: ["fandom/black-butler"],
  publishedAt: "2014-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "511082",
      externalLink: "https://www.themoviedb.org/movie/511082",
    },
  ],
  title: "Black Butler: Book of Murder",
  createdAt: "2026-10-28T18:49:35.132Z",
  updatedAt: "2026-10-28T18:49:35.132Z",
} as const satisfies Movie
