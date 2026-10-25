import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aNovelRomance = {
  id: "01a17499-8943-73f5-8b7f-af38eafbda63",
  type: "page-type/movie",
  slug: "a-novel-romance",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2015-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "311181",
      externalLink: "https://www.themoviedb.org/movie/311181",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Novel Romance",
  genres: ["TV Movie", "Romance", "Comedy", "Drama"],
  imdbId: "tt3783746",
  posterPath: "/cLgHUoemiSv3TqoCOnb8oiYdRVX.jpg",
  voteAverage: 6.033,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
