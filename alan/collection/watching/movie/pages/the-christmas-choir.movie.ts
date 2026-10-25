import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasChoir = {
  id: "01a17499-470e-7789-af98-2df8c5c551fb",
  type: "page-type/movie",
  slug: "the-christmas-choir",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2008-12-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "57860",
      externalLink: "https://www.themoviedb.org/movie/57860",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Christmas_Choir" },
  ],
  title: "The Christmas Choir",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt1285239",
  posterPath: "/f75tP68paBp9e90lRECq016bu3L.jpg",
  voteAverage: 5.1,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
