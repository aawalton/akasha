import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const whenCallsTheHeartNewYearSWish = {
  id: "01a17499-894a-7aa3-bce0-1e0359046dd2",
  type: "page-type/movie",
  slug: "when-calls-the-heart-new-year-s-wish",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/when-calls-the-heart"],
  position: 3,
  publishedAt: "2015-12-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1383585",
      externalLink: "https://www.themoviedb.org/movie/1383585",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "When Calls the Heart: New Year's Wish",
  genres: ["Drama", "History", "Romance"],
  imdbId: "tt5253306",
  posterPath: "/4AV6aatp2laOR7xdeVdm9sN7aT3.jpg",
  voteAverage: 0,
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T20:45:01.766Z",
} as const satisfies Movie
