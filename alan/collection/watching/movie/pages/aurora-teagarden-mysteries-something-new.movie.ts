import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const auroraTeagardenMysteriesSomethingNew = {
  id: "01a1749a-89a7-7f46-9a9f-b3a95749aa8d",
  type: "page-type/movie",
  slug: "aurora-teagarden-mysteries-something-new",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/aurora-teagarden-mystery"],
  position: 19,
  publishedAt: "2023-06-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1101840",
      externalLink: "https://www.themoviedb.org/movie/1101840",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Aurora Teagarden Mysteries: Something New",
  genres: ["TV Movie", "Mystery", "Drama"],
  imdbId: "tt27075102",
  posterPath: "/cGyAejFbRCctTMt74hK4aExzsKn.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
