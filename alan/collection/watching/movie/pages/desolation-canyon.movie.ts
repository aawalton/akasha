import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const desolationCanyon = {
  id: "01a17497-3825-7adb-bea5-ad40a1531316",
  type: "page-type/movie",
  slug: "desolation-canyon",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2006-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "126227",
      externalLink: "https://www.themoviedb.org/movie/126227",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Desolation_Canyon_(film)" },
  ],
  title: "Desolation Canyon",
  genres: ["Western"],
  imdbId: "tt0463959",
  posterPath: "/tmLAaLVVlPTBCvVD0WGalkrBkl.jpg",
  voteAverage: 6.1,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
