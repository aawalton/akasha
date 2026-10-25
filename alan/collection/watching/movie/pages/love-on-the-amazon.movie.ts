import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveOnTheAmazon = {
  id: "01a1749a-c869-70c7-8dc6-263dafdc4137",
  type: "page-type/movie",
  slug: "love-on-the-amazon",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-01-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1592734",
      externalLink: "https://www.themoviedb.org/movie/1592734",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love on the Amazon",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt39101156",
  posterPath: "/htrU3ly6waXgL74qbP2890BT8YL.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
