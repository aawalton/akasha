import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const gingerbreadMiracle = {
  id: "01a1749a-259a-72c3-9434-a7582b36e9ae",
  type: "page-type/movie",
  slug: "gingerbread-miracle",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874244",
      externalLink: "https://www.themoviedb.org/movie/874244",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Gingerbread Miracle",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt15821582",
  posterPath: "/r6oT4u5nUNxKxpKVKbEhzX9pS8I.jpg",
  voteAverage: 6,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/pluto-tv",
    "streaming-service/vix",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
