import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasAtHollyLodge = {
  id: "01a17499-c95a-71ce-aae4-d77f308a9f69",
  type: "page-type/movie",
  slug: "christmas-at-holly-lodge",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-12-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "480622",
      externalLink: "https://www.themoviedb.org/movie/480622",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas at Holly Lodge",
  genres: ["Drama", "TV Movie", "Romance"],
  imdbId: "tt7557728",
  posterPath: "/iwLkbvvDIBVVmILnoBUUSaqcvVm.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
