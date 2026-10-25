import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const justInTimeForChristmas = {
  id: "01a17499-8946-78e9-aa97-fa0fd5cfe1c1",
  type: "page-type/movie",
  slug: "just-in-time-for-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2015-12-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "363486",
      externalLink: "https://www.themoviedb.org/movie/363486",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Just in Time for Christmas",
  genres: ["Fantasy", "TV Movie", "Romance", "Drama"],
  imdbId: "tt5014528",
  posterPath: "/uyaCUEil9nBQmnCtt5zGcmztLXB.jpg",
  voteAverage: 6.21,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
