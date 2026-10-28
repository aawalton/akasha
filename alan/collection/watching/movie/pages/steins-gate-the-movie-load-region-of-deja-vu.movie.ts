import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const steinsGateTheMovieLoadRegionOfDejaVu = {
  id: "01a183d5-0903-76c1-a482-0d7a9cf78f10",
  type: "page-type/movie",
  slug: "steins-gate-the-movie-load-region-of-deja-vu",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["fandom/steins-gate"],
  publishedAt: "2013-04-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "225745",
      externalLink: "https://www.themoviedb.org/movie/225745",
    },
  ],
  title: "Steins;Gate: The Movie - Load Region of Déjà Vu",
  createdAt: "2026-10-28T18:45:39.203Z",
  updatedAt: "2026-10-28T18:45:39.203Z",
} as const satisfies Movie
