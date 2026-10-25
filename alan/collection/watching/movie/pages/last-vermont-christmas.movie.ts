import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const lastVermontChristmas = {
  id: "01a17499-e804-745b-9d00-97ae19fbfeef",
  type: "page-type/movie",
  slug: "last-vermont-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "555183",
      externalLink: "https://www.themoviedb.org/movie/555183",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Last Vermont Christmas",
  genres: ["Drama", "TV Movie", "Romance"],
  imdbId: "tt8420670",
  posterPath: "/3MEE0NKgHfL5iyxU1LDl240EYzz.jpg",
  voteAverage: 5.9,
  streamingOn: ["Philo", "fuboTV"],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
