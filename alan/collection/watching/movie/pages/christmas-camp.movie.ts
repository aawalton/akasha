import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasCamp = {
  id: "01a1749a-06ba-739e-a935-024d0e5ab682",
  type: "page-type/movie",
  slug: "christmas-camp",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-07-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "563730",
      externalLink: "https://www.themoviedb.org/movie/563730",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Camp",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt8354006",
  posterPath: "/f2sdnlD9NsetKWlOMJZGiPhrUH.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
