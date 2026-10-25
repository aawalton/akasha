import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const beMyValentine = {
  id: "01a17499-669d-7437-ab8c-8dbdcd91916b",
  type: "page-type/movie",
  slug: "be-my-valentine",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2013-02-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "226167",
      externalLink: "https://www.themoviedb.org/movie/226167",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Be My Valentine",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt2288568",
  posterPath: "/6w7eP1sSsaq30VZlpqR9r2vOdy1.jpg",
  voteAverage: 5.7,
  streamingOn: ["AsianCrush"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
