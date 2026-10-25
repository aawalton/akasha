import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const chateauChristmas = {
  id: "01a1749a-06ba-7150-8f70-b2778fa1538f",
  type: "page-type/movie",
  slug: "chateau-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "737779",
      externalLink: "https://www.themoviedb.org/movie/737779",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Chateau Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt13350688",
  posterPath: "/6ZgaL0HewMSMlvV6FHXG7VwtTMe.jpg",
  voteAverage: 6.137,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
