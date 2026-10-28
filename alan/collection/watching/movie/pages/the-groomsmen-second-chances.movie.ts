import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theGroomsmenSecondChances = {
  id: "01a1749a-a94d-7969-be62-b64f14937c91",
  type: "page-type/movie",
  slug: "the-groomsmen-second-chances",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["franchise/the-groomsmen"],
  position: 2,
  publishedAt: "2024-10-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1353958",
      externalLink: "https://www.themoviedb.org/movie/1353958",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Groomsmen: Second Chances",
  genres: ["TV Movie"],
  imdbId: "tt32915125",
  posterPath: "/eN0qr7e4e9KUlGywkY9Ar2dS5mn.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
