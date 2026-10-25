import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const angelFallsANovelHoliday = {
  id: "01a1749a-06ba-72b7-a061-451a35d1d862",
  type: "page-type/movie",
  slug: "angel-falls-a-novel-holiday",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "630920",
      externalLink: "https://www.themoviedb.org/movie/630920",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Angel Falls: A Novel Holiday",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10922632",
  posterPath: "/50SEuVmS3uK5amzHGzxJntYwY9r.jpg",
  voteAverage: 6.3,
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
