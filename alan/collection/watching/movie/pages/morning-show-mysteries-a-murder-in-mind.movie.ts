import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const morningShowMysteriesAMurderInMind = {
  id: "01a1749a-06bd-7fef-8409-e3dbc896f1a5",
  type: "page-type/movie",
  slug: "morning-show-mysteries-a-murder-in-mind",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/morning-show-mysteries"],
  position: 3,
  publishedAt: "2019-04-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "594626",
      externalLink: "https://www.themoviedb.org/movie/594626",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Morning Show Mysteries: A Murder in Mind",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt9822254",
  posterPath: "/iJ8E4rau3Y8AvttJ8lI0UfsNy6t.jpg",
  voteAverage: 6.56,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
