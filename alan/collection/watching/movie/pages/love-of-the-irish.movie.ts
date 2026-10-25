import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveOfTheIrish = {
  id: "01a1749a-a94b-7cd5-a590-28864b781cc1",
  type: "page-type/movie",
  slug: "love-of-the-irish",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-01-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1396979",
      externalLink: "https://www.themoviedb.org/movie/1396979",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love of the Irish",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt31943282",
  posterPath: "/hgqSjuEKVYhaxS2wann7DvcjEfN.jpg",
  voteAverage: 7.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
