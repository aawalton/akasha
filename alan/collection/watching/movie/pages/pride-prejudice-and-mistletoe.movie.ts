import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const pridePrejudiceAndMistletoe = {
  id: "01a17499-e805-7a6a-b00f-3521c584754b",
  type: "page-type/movie",
  slug: "pride-prejudice-and-mistletoe",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "535810",
      externalLink: "https://www.themoviedb.org/movie/535810",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Pride, Prejudice, and Mistletoe",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt8634192",
  posterPath: "/bEZ0Sd1Jy22gKij2LONgitlRmNV.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
