import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const chronicleMysteriesVinesThatBind = {
  id: "01a1749a-06bb-70bf-875d-feb5350ee6eb",
  type: "page-type/movie",
  slug: "chronicle-mysteries-vines-that-bind",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/chronicle-mysteries"],
  position: 2,
  publishedAt: "2019-03-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "583372",
      externalLink: "https://www.themoviedb.org/movie/583372",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Chronicle Mysteries: Vines that Bind",
  genres: ["TV Movie", "Mystery", "Crime"],
  imdbId: "tt9876822",
  posterPath: "/xqwXUeE4RAMDqVhs7S94vbmr7bH.jpg",
  voteAverage: 8.026,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
