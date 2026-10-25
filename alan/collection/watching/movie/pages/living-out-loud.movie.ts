import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const livingOutLoud = {
  id: "01a17499-470d-7714-a070-5e720ec5bf45",
  type: "page-type/movie",
  slug: "living-out-loud",
  ownLength: 100,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2009-05-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "227557",
      externalLink: "https://www.themoviedb.org/movie/227557",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Living Out Loud",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt1227530",
  posterPath: "/fjTISnbfypAHj3mtVQjzk5DwDUj.jpg",
  voteAverage: 2.5,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
