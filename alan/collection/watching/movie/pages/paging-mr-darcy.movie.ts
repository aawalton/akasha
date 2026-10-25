import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const pagingMrDarcy = {
  id: "01a1749a-89aa-7a1d-b3f3-f0df4ba794cd",
  type: "page-type/movie",
  slug: "paging-mr-darcy",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-02-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1221673",
      externalLink: "https://www.themoviedb.org/movie/1221673",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Paging Mr. Darcy",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt29889566",
  posterPath: "/5GnFR8qCyC1p4woK3kE5CnRRdx7.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
