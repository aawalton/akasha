import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const unexpectedGrace = {
  id: "01a1749a-89ac-746f-a9b7-a3967b293a73",
  type: "page-type/movie",
  slug: "unexpected-grace",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2023-03-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1081445",
      externalLink: "https://www.themoviedb.org/movie/1081445",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Unexpected Grace",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt26593230",
  posterPath: "/9rIDl1NnGsL9ZkfdyVcHvPcPcs5.jpg",
  voteAverage: 7.55,
  streamingOn: ["Hallmark+ Amazon Channel", "Hallmark+ Apple TV channel", "fuboTV"],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
