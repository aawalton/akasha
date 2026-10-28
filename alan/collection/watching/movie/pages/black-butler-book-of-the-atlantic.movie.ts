import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const blackButlerBookOfTheAtlantic = {
  id: "01a183d8-a89d-729f-9275-2e586946d2e1",
  type: "page-type/movie",
  slug: "black-butler-book-of-the-atlantic",
  ownLength: 100,
  ownProgress: 0,
  partOfCollections: ["fandom/black-butler"],
  publishedAt: "2017-01-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "432131",
      externalLink: "https://www.themoviedb.org/movie/432131",
    },
  ],
  title: "Black Butler: Book of the Atlantic",
  createdAt: "2026-10-28T18:49:36.669Z",
  updatedAt: "2026-10-28T18:49:36.669Z",
} as const satisfies Movie
