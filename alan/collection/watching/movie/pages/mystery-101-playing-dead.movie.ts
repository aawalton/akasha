import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mystery101PlayingDead = {
  id: "01a1749a-06be-7566-a861-f06b89a29c9b",
  type: "page-type/movie",
  slug: "mystery-101-playing-dead",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-101"],
  position: 2,
  publishedAt: "2019-06-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "606462",
      externalLink: "https://www.themoviedb.org/movie/606462",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery 101: Playing Dead",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt10369966",
  posterPath: "/zzrV6Zf06GmQuNxtHOzmJImtYjx.jpg",
  voteAverage: 7.337,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/youtube-tv",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
