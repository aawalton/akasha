import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const chronicleMysteriesTheWrongMan = {
  id: "01a1749a-06bb-740d-8c26-ef75cf3900bf",
  type: "page-type/movie",
  slug: "chronicle-mysteries-the-wrong-man",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["franchise/chronicle-mysteries"],
  position: 2,
  publishedAt: "2019-02-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "582624",
      externalLink: "https://www.themoviedb.org/movie/582624",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Chronicle Mysteries: The Wrong Man",
  genres: ["TV Movie", "Mystery", "Crime"],
  imdbId: "tt9814988",
  posterPath: "/o3nIsEoEQHRFdm8KciKIhCIm44B.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
