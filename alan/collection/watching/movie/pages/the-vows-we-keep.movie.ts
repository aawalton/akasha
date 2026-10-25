import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theVowsWeKeep = {
  id: "01a1749a-464e-7a05-97cf-a2eee6a5b4c9",
  type: "page-type/movie",
  slug: "the-vows-we-keep",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2021-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "860269",
      externalLink: "https://www.themoviedb.org/movie/860269",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Vows We Keep",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt15214826",
  posterPath: "/dL3AYVjWSWQI1KHlqDxHGkfU5kM.jpg",
  voteAverage: 7.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
