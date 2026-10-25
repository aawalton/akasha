import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const santaTellMe = {
  id: "01a1749a-89aa-7fce-8fd7-32923abdaff7",
  type: "page-type/movie",
  slug: "santa-tell-me",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-11-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1325888",
      externalLink: "https://www.themoviedb.org/movie/1325888",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Santa Tell Me",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt33829315",
  posterPath: "/zKvCa16DTB1gJJ9hdCpSHyWu9Ue.jpg",
  voteAverage: 7.047,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
