import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasList = {
  id: "01a17499-a7d4-7fbd-b413-850aad59d887",
  type: "page-type/movie",
  slug: "christmas-list",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "416251",
      externalLink: "https://www.themoviedb.org/movie/416251",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas List",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt5902138",
  posterPath: "/m7TUHDDvvnK8b0Hc0KuTzkXDOj2.jpg",
  voteAverage: 5.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
