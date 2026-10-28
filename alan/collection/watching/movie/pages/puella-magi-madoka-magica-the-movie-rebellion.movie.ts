import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const puellaMagiMadokaMagicaTheMovieRebellion = {
  id: "01a183d5-c55b-7f2d-86c1-92aff6f336e5",
  type: "page-type/movie",
  slug: "puella-magi-madoka-magica-the-movie-rebellion",
  ownLength: 117,
  ownProgress: 0,
  partOfCollections: ["fandom/puella-magi-madoka-magica"],
  publishedAt: "2013-10-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "212162",
      externalLink: "https://www.themoviedb.org/movie/212162",
    },
  ],
  title: "Puella Magi Madoka Magica the Movie -Rebellion-",
  createdAt: "2026-10-28T18:46:27.419Z",
  updatedAt: "2026-10-28T18:46:27.419Z",
} as const satisfies Movie
