import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aWinterPrincess = {
  id: "01a17499-e801-7c85-a343-bdc0cdfcd72c",
  type: "page-type/movie",
  slug: "a-winter-princess",
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-01-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "570192",
      externalLink: "https://www.themoviedb.org/movie/570192",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Winter Princess",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt9556730",
  posterPath: "/srLvqEJIr2uaV0eIhZkZwZxsZH8.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
