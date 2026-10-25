import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aussieAtHeart = {
  id: "01a1749a-c868-7d25-9e41-cdde2e618050",
  type: "page-type/movie",
  slug: "aussie-at-heart",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-08-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1725038",
      externalLink: "https://www.themoviedb.org/movie/1725038",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Aussie at Heart",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt41281879",
  posterPath: "/jDD0xST4NqKJzgUdOngdVKKr645.jpg",
  voteAverage: 5.75,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
