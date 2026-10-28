import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveOnTheDanubeLoveSong = {
  id: "01a1749a-a94b-75fc-ba11-3cf18df2fb67",
  type: "page-type/movie",
  slug: "love-on-the-danube-love-song",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/love-on-the-danube"],
  position: 1,
  publishedAt: "2024-09-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1329918",
      externalLink: "https://www.themoviedb.org/movie/1329918",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love on the Danube: Love Song",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt33113349",
  posterPath: "/sF73gQCEspc2ItSJVQpHZOq85it.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
