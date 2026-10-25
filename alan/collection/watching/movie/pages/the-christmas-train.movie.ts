import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasTrain = {
  id: "01a17499-c95f-718b-ac63-2693e09613cc",
  type: "page-type/movie",
  slug: "the-christmas-train",
  ownLength: 98,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "474982",
      externalLink: "https://www.themoviedb.org/movie/474982",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/The_Christmas_Train_(film)",
    },
  ],
  title: "The Christmas Train",
  genres: ["Family", "TV Movie", "Drama", "Romance"],
  imdbId: "tt7370936",
  posterPath: "/4HNkp0zCLTeQuPR5xARkZM1KFVB.jpg",
  voteAverage: 6.389,
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
