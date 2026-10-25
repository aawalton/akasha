import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasGetaway = {
  id: "01a17499-c95b-742c-a7dc-0f705eef4cde",
  type: "page-type/movie",
  slug: "christmas-getaway",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-12-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "480623",
      externalLink: "https://www.themoviedb.org/movie/480623",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Getaway",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt7688990",
  posterPath: "/ohBJhAI7YJrlYmnr4czCvZj1FW7.jpg",
  voteAverage: 7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
