import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const crosswordMysteriesProposingMurder = {
  id: "01a1749a-06bb-71aa-806b-461269dba58f",
  type: "page-type/movie",
  slug: "crossword-mysteries-proposing-murder",
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["franchise/crossword-mysteries"],
  position: 2,
  publishedAt: "2019-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "639254",
      externalLink: "https://www.themoviedb.org/movie/639254",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Crossword Mysteries: Proposing Murder",
  genres: ["TV Movie", "Mystery", "Crime"],
  imdbId: "tt9759888",
  posterPath: "/7F68QPWGpQalpMeGVTGZjoWYvKi.jpg",
  voteAverage: 7.515,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
