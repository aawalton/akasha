import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fullmetalAlchemistTheMovieConquerorOfShamballa = {
  id: "01a183d2-8663-7f05-a026-60b1b9ab023a",
  type: "page-type/movie",
  slug: "fullmetal-alchemist-the-movie-conqueror-of-shamballa",
  ownLength: 105,
  ownProgress: 0,
  partOfCollections: ["fandom/fullmetal-alchemist"],
  publishedAt: "2005-07-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "14003", externalLink: "https://www.themoviedb.org/movie/14003" },
  ],
  title: "Fullmetal Alchemist the Movie: Conqueror of Shamballa",
  createdAt: "2026-10-28T18:42:54.691Z",
  updatedAt: "2026-10-28T18:42:54.691Z",
} as const satisfies Movie
