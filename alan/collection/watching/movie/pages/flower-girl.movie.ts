import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const flowerGirl = {
  id: "01a17499-470c-7c59-b897-94f021bd1d26",
  type: "page-type/movie",
  slug: "flower-girl",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2009-11-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "82100",
      externalLink: "https://www.themoviedb.org/movie/82100",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Flower Girl",
  genres: ["Comedy", "Music", "Romance", "TV Movie", "Drama"],
  imdbId: "tt1316414",
  posterPath: "/jEsomq80Hccs4AqD2LK7uI8RNfH.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
