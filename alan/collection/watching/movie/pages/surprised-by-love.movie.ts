import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const surprisedByLove = {
  id: "01a17499-8949-7adc-b169-62848f95d62b",
  type: "page-type/movie",
  slug: "surprised-by-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2015-01-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "315134",
      externalLink: "https://www.themoviedb.org/movie/315134",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Surprised by Love",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt4016588",
  posterPath: "/9ozs4hUFvbnh24XG86JMWKrQz7P.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
