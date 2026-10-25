import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasWishesMistletoeKisses = {
  id: "01a17499-e802-7c9f-b742-d478b54ad0c0",
  type: "page-type/movie",
  slug: "christmas-wishes-mistletoe-kisses",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-10-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "604553",
      externalLink: "https://www.themoviedb.org/movie/604553",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Wishes & Mistletoe Kisses",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10136898",
  posterPath: "/gh9iUFpPkbS30bJFaek34JLDkls.jpg",
  voteAverage: 6.402,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
