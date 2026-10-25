import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theThanksgivingHouse = {
  id: "01a17499-66a3-7b5a-a509-c090f7c97acf",
  type: "page-type/movie",
  slug: "the-thanksgiving-house",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2013-11-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "234951",
      externalLink: "https://www.themoviedb.org/movie/234951",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Thanksgiving House",
  genres: ["TV Movie", "Family", "Romance"],
  imdbId: "tt2640502",
  posterPath: "/qT1dMKsIIaIsASsHzoLKFXIIYDI.jpg",
  voteAverage: 6.1,
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
