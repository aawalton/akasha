import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theCasesOfMysteryLane = {
  id: "01a1749a-89ab-72ae-85af-02cc279866ba",
  type: "page-type/movie",
  slug: "the-cases-of-mystery-lane",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-cases-of-mystery-lane"],
  position: 1,
  publishedAt: "2023-03-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1081429",
      externalLink: "https://www.themoviedb.org/movie/1081429",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Cases of Mystery Lane",
  genres: ["TV Movie", "Mystery", "Drama", "Romance", "Comedy"],
  imdbId: "tt26545218",
  posterPath: "/yTMpYCOwCmqPAmug4oFuH1wGH7F.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
